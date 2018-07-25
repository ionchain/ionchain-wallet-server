//定义手机短信服务前缀
exports.SMS_REGISTER_PREFIX = "register";
exports.SMS_COUNTER = "counter";
//手机号正则表达式
exports.TELEPHONE_REGEX = /^(13|15|17|18|14)[0-9]{9}$/;
//0-9a-zA-Z
exports.ALPHA_NUMBER = /^[a-zA-Z0-9]+$/;
//8-20位密码，其中至少有一个大写字母、小写字母和数字
exports.PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
//奖励类型
exports.REWARDS = {
    "register":{"type":1,"amount":20},
    "invite":{"type":2,"amount":20},
    "sign":{"type":3,"amount":10}
};
