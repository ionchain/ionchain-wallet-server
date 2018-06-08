let express = require("express");
let router = express.Router();
let redis = require("../utils/redis");
let constants = require("../utils/constants");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
/**
 * 发送短信验证码
 * @param{string} tel
 * @return {object}
 */
router.get("/sendSms/:tel", (req, res) => {
    let tel = req.params.tel;
    var responseMessage = new ResponseMessage();
    redis.exists(constants.SMS_REGISTER_PREFIX + tel, function (err, result) {
        if(result === 1){
            responseMessage.exception(Status.EXCEPTION_PARAMS,"请求过于频繁,请稍后再试!");
            return res.json(responseMessage);
        }
        //生成4位数字的随机数
        let code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);
        redis.set(constants.SMS_REGISTER_PREFIX+tel,code,"EX",60);
        responseMessage.success("验证码为："+code+",为了您的信息安全，请妥善保管。随机验证码的有效时间为一分钟！",null);
        return res.json(responseMessage);
    });
});
module.exports = router;

