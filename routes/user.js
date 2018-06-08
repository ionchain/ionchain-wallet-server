let express = require("express");
let router = express.Router();
let userMapper = require("../models/user");
let redis = require("../utils/redis");
let constants = require("../utils/constants");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');

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
    userMapper.findByTelAndPassword(tel,password).then(rows=>{
        if(rows && rows.length === 1){
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
 * User register
 * @param {string} smsCode
 * @param {string} tel
 * @param {string} password
 * @return {object}
 */
router.post("/user",function (req,res) {
    let smsCode = req.body.smsCode;
    let user = req.body.user;
    let responseMessage = new ResponseMessage();
    if(!smsCode){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"短信验证码不能为空!");
        return res.json(responseMessage);
    }
    if(!user){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"用户信息不能为空!");
        return res.json(responseMessage);
    }
    if(!user.tel || !constants.TELEPHONE_REGEX.exec(user.tel)){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"手机格式不正确!");
        return res.json(responseMessage);
    }
    if(!user.password){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"用户密码不能为空!");
        return res.json(responseMessage)
    }
    //验证手机短信验证码
    redis.exists(constants.SMS_REGISTER_PREFIX+user.tel,function (error,result) {
        if(error){
            console.log(error);
            responseMessage.exception(Status.EXCEPTION_INNER_ERROR,"服务器内部错误!");
            return res.json(responseMessage);
        }
        if(result !== 1){
            responseMessage.exception(Status.EXCEPTION_PARAMS,"验证码已失效,请重新发送!");
            return res.json(responseMessage);
        }
        redis.get("register"+user.tel,function (error,code ) {
            if(smsCode !== code){
                responseMessage.exception(Status.EXCEPTION_PARAMS,"验证码不匹配,请重新输入!");
                return res.json(responseMessage);
            }
            //验证手机号是否注册过
            userMapper.findByTel(user.tel).then(rows=>{
                if(rows && rows.length > 0){
                    responseMessage.exception(Status.EXCEPTION_ADD,"该手机号已经注册!");
                    return res.json(responseMessage);
                }
                //用户注册(将用户名默认设置为手机号)
                user.username = user.tel;
                userMapper.save(user).then(id=>{
                    responseMessage.success(null,"注册成功!");
                    res.json(responseMessage);
                }).catch(error=>{
                    console.log(error);
                    responseMessage.exception(Status.EXCEPTION_ADD,"注册失败!");
                    res.json(responseMessage);
                })
            }).catch(error=>{
                console.log(error);
                responseMessage.exception(Status.EXCEPTION_QUERY,"查询失败!");
                res.json(responseMessage);
            })
        })
    })
})
module.exports = router;