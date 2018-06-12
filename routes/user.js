let express = require("express");
let router = express.Router();
let userMapper = require("../models/user");
let redis = require("../utils/redis");
let constants = require("../utils/constants");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let utils = require('utility');

/**
 * Find user through telephone number
 * @param {string} tel
 * @return {object}
 */
router.get("/user/:tel", (req, res) => {
    let responseMessage = new ResponseMessage();
    userMapper.findByTel(req.params.tel).then(rows=>{
        responseMessage.success(rows,null);
        res.json(responseMessage);
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        res.json(responseMessage);
    })
});

/**
 * User login
 * @param {object} tel
 * @param {object} password
 * @return {object}
 */
router.post("/user/login", (req, res) => {
    let tel = req.body.tel;
    let password = req.body.password;
    let responseMessage = new ResponseMessage();
    userMapper.findByTelAndPassword(tel,utils.md5(password)).then(rows=>{
        if(rows && rows.length === 1){
            delete rows[0]["password"];
            responseMessage.success(rows[0],null);
            res.json(responseMessage);
        }else{
            responseMessage.exception(Status.EXCEPTION_QUERY,"用户名或者密码不匹配!")
            res.json(responseMessage);
        }
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        res.json(responseMessage);
    })
});

/**
 * Find all user
 * @return {object}
 */
router.get("/user",function (req,res) {
    let responseMessage = new ResponseMessage();
    userMapper.findAll().then(rows=>{
        responseMessage.success(rows,null);
        res.json(responseMessage);
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        res.json(responseMessage);
    })
})

/**
 * User update password
 * @param {string} smsCode
 * @param {string} tel
 * @param {string} newPassword
 * @return {object}
 */
router.post("/user/updatePassword",function (req,res) {
    let smsCode = req.body.smsCode;
    let tel = req.body.tel;
    let newpassword = req.body.newpassword;
    let responseMessage = new ResponseMessage();
    if(!smsCode){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"短信验证码不能为空!");
        return res.json(responseMessage);
    }
    if(!tel || !constants.TELEPHONE_REGEX.test(tel)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"手机格式不正确!");
        return res.json(responseMessage);
    }
    if(!newpassword){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"用户密码不能为空!");
        return res.json(responseMessage)
    }
    if(!constants.ALPHA_NUMBER.test(newpassword)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"密码只能由字母和数字组成!");
        return res.json(responseMessage);
    }
    if(!constants.PASSWORD_REGEX.test(newpassword)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"密码长度为8-20位，且至少有一个大写字母、小写字母和一个数字!");
        return res.json(responseMessage);
    }
    //验证手机短信验证码
    redis.exists(constants.SMS_REGISTER_PREFIX+tel,function (error,result) {
        if(error){
            console.log(error);
            responseMessage.exception(Status.EXCEPTION_INNER_ERROR,"服务器内部错误!");
            return res.json(responseMessage);
        }
        if(result !== 1){
            responseMessage.exception(Status.EXCEPTION_PARAMS,"验证码已失效,请重新发送!");
            return res.json(responseMessage);
        }
        redis.get(constants.SMS_REGISTER_PREFIX+tel,function (error,code ) {
            if(smsCode !== code){
                responseMessage.exception(Status.EXCEPTION_PARAMS,"验证码不匹配,请重新输入!");
                return res.json(responseMessage);
            }
            //验证手机号是否注册过
            userMapper.findByTel(tel).then(rows=>{
                if(!rows || rows.length === 0){
                    responseMessage.exception(Status.EXCEPTION_ADD,"该手机号未注册!");
                    return res.json(responseMessage);
                }
                userMapper.updatePassword(rows[0].userid,utils.md5(newpassword)).then(id=>{
                    responseMessage.success(null,"密码修改成功!");
                    //注册成功移除redis短信验证码缓存
                    redis.del(constants.SMS_REGISTER_PREFIX+tel,function (error,code) {
                        if(error){
                            console.log("error = " + error + ", code = " + code);
                        }
                    })
                    return res.json(responseMessage);
                }).catch(error=>{
                    console.log(error);
                    responseMessage.exception(Status.EXCEPTION_ADD,"修改密码失败!");
                    return res.json(responseMessage);
                })
            }).catch(error=>{
                console.log(error);
                responseMessage.exception(Status.EXCEPTION_QUERY,"查询失败!");
                return res.json(responseMessage);
            })
        })
    })

});

/**
 * User register
 * @param {string} smsCode
 * @param {string} tel
 * @param {string} password
 * @param {string} inviteCode
 * @return {object}
 */
router.post("/user",function (req,res) {
    let smsCode = req.body.smsCode;
    let tel = req.body.tel;
    let password = req.body.password;
    let inviteCode = req.body.inviteCode;
    let responseMessage = new ResponseMessage();
    if(!smsCode){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"短信验证码不能为空!");
        return res.json(responseMessage);
    }
    if(!tel || !constants.TELEPHONE_REGEX.exec(tel)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"手机格式不正确!");
        return res.json(responseMessage);
    }
    if(!password){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"用户密码不能为空!");
        return res.json(responseMessage)
    }
    if(!constants.ALPHA_NUMBER.test(password)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"密码只能由字母和数字组成!");
        return res.json(responseMessage);
    }
    if(!constants.PASSWORD_REGEX.test(password)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"密码长度为8-20位，且至少有一个大写字母、小写字母和一个数字!");
        return res.json(responseMessage);
    }
    //验证手机短信验证码
    redis.exists(constants.SMS_REGISTER_PREFIX+tel,function (error,result) {
        if(error){
            console.log(error);
            responseMessage.exception(Status.EXCEPTION_INNER_ERROR,"服务器内部错误!");
            return res.json(responseMessage);
        }
        if(result !== 1){
            responseMessage.exception(Status.EXCEPTION_PARAMS,"验证码已失效,请重新发送!");
            return res.json(responseMessage);
        }
        redis.get(constants.SMS_REGISTER_PREFIX+tel,function (error,code ) {
            if(smsCode !== code){
                responseMessage.exception(Status.EXCEPTION_PARAMS,"验证码不匹配,请重新输入!");
                return res.json(responseMessage);
            }
            //验证手机号是否注册过
            userMapper.findByTel(tel).then(rows=>{
                if(rows && rows.length > 0){
                    responseMessage.exception(Status.EXCEPTION_ADD,"该手机号已经注册!");
                    return res.json(responseMessage);
                }
                //用户注册(将用户名默认设置为手机号)
                let user = {};
                user.tel = tel;
                user.username = tel;
                user.password = utils.md5(password);
                //匹配mysql邀请码字段
                user.invite_code = inviteCode;
                user.usertype = 3;//前台用户
                userMapper.save(user).then(id=>{
                    responseMessage.success(null,"注册成功!");
                    //注册成功移除redis短信验证码缓存
                    redis.del(constants.SMS_REGISTER_PREFIX+tel,function (error,code) {
                        if(error){
                            console.log("error = " + error + ", code = " + code);
                        }
                    })
                    return res.json(responseMessage);
                }).catch(error=>{
                    console.log(error);
                    responseMessage.exception(Status.EXCEPTION_ADD,"注册失败!");
                    return res.json(responseMessage);
                })
            }).catch(error=>{
                console.log(error);
                responseMessage.exception(Status.EXCEPTION_QUERY,"查询失败!");
                return res.json(responseMessage);
            })
        })
    })
})
module.exports = router;