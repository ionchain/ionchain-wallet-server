let Queue = require('better-queue');
let userMapper = require("../models/user");
let coinDetailMapper = require("../models/coinRecord");
let userInviteMapper = require("../models/inviteRecord");
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("article");
let utils = require("utility");

/**
 * Queue for saving coinDetail
 * @type {Queue}
 */
let coinDetailQueue = new Queue(async function (coinDetail, cb) {
    try{
        await coinDetailMapper.save(coinDetail);
        cb(null,"success");
    }catch (error){
        logger.error("保存离子币收支记录失败!"+error);
        cb(null,"fail");
    }
});

/**
 * Queue for saving inviteRecord and updating invite reword
 * @type {Queue}
 */
let inviteRewardQueue = new Queue(async function (userInvite, cb) {
    try {
        let rows = await userMapper.findByInviteCode(userInvite.invitecode);
        if(!rows || rows.length === 0){
            logger.error("邀请码不存在!请求参数="+JSON.stringify(userInvite));
            cb(null,"fail");
            return;
        }
        let inviter = rows[0];
        await userMapper.updateIonCoin(inviter.userid, 100);
        await userInviteMapper.save(userInvite);
        let coinDetail = {};
        coinDetail.userid = inviter.userid;
        coinDetail.type = 2;
        coinDetail.amount = 100;
        coinDetail.create_time = utils.YYYYMMDDHHmmss();
        coinDetailQueue.push(coinDetail);
        cb(null,"success");
    }catch (error){
        logger.error("领取邀请奖励失败!" + error);
        cb(null,"fail");
    }
});

/**
 * Queue for saving coinDetail and updating register reword
 * @type {Queue}
 */
let registerRewardQueue = new Queue(async function (userId, cb) {
    try{
        await userMapper.updateIonCoin(userId,30);
        let coinDetail = {};
        coinDetail.userid = userId;
        coinDetail.type = 1;
        coinDetail.amount = 30;
        coinDetail.create_time = utils.YYYYMMDDHHmmss();
        coinDetailQueue.push(coinDetail);
        cb(null,"success");
    }catch (error){
        logger.error("领取注册奖励失败!"+error);
        cb(null,"fail");
    }
});
exports.registerRewardQueue = registerRewardQueue;
exports.inviteRewardQueue = inviteRewardQueue;
