let express = require("express");
let router = express.Router();
let redis = require("../utils/redis");
let constants = require("../utils/constants");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let utils = require('utility');
let request = require('request-json');
let uuidv4 = require('uuid/v4');
let StringBuffer = require("stringbuffer");

Buffer.prototype.toByteArray = function () {
    return Array.prototype.slice.call(this, 0);
}
/**
 * 发送短信验证码
 * @param{string} tel
 * @return {object}
 */
router.get("/sendSms/:tel", (req, res) => {
    let tel = req.params.tel;
    let responseMessage = new ResponseMessage();
    redis.exists(constants.SMS_REGISTER_PREFIX + tel, function (err, result) {
        if(result === 1){
            responseMessage.exception(Status.EXCEPTION_PARAMS,"请求过于频繁,请稍后再试!");
            return res.json(responseMessage);
        }
        //生成4位数字的随机数
        let code = Math.floor(Math.random() * (9999 - 999 + 1) + 999)+"";
        //发送短信验证码
        sendSms(tel,code).then(obj=>{
            redis.set(constants.SMS_REGISTER_PREFIX+tel,code,"EX",300);
            responseMessage.success("验证码发送成功!",null);
            return res.json(responseMessage);
        }).catch(error=>{
            responseMessage.exception(Status.EXCEPTION_SMS,error);
            return res.json(responseMessage);
        });
    });

});

/**
 * 调用短信服务接口
 * @param {string} mobile
 * @param {string} code
 * @return {Promise}
 */
function sendSms(mobile,code) {
    //请求地址
    let server = "http://sms.api.vonechain.com/";
    //请求方法
    let method = "api/message/";
    //用户平台API账号
    let account = "ion_wallet";
    //用户平台API密码
    let password = "ion388833";
    //验签参数
    let token = "123456";
    //短信通道编号
    let channelNo = "1";
    //模板编号
    let templateNo = "2";

    //身份认证
    let authorization = "Basic " +  utils.base64encode(new Buffer(account + ":" + password).toByteArray());
    let client = request.createClient(server);
    client.headers['Authorization'] = authorization;

    //请求参数设置
    let requestParams = {};
    requestParams.mobile = mobile;
    requestParams.templateNo = templateNo;
    requestParams.channelNo = channelNo;
    requestParams.sync = true;
    requestParams.traceId = uuidv4();
    requestParams.ts = new Date().getTime();
    let params = {};
    params.verification_code = code;
    requestParams.params = params;

    //生成签名
    let sb = new StringBuffer();
    sb.append(requestParams.traceId).append(",");
    sb.append(requestParams.mobile).append(",");
    sb.append(requestParams.templateNo).append(",");
    sb.append(requestParams.channelNo).append(",");
    sb.append(requestParams.ts).append(",");
    sb.append(token);
    requestParams.sign = utils.md5(sb.toString()).toUpperCase();

    return new Promise(( resolve, reject ) => {
        client.post(method, requestParams, function (err, res, body) {
            if (!err && body.code === 0) {
                console.log("短信发送成功! body=" + JSON.stringify(body));
                resolve(body);
            } else {
                console.log("短信发送失败! err=" + JSON.stringify(body));
                reject(body.msg);
            }
        });
    });
}
module.exports = router;

