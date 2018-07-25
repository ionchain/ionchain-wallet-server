let Queue = require('better-queue');
let userMapper = require("../models/user");
let coinDetailMapper = require("../models/coinRecord");
let userInviteMapper = require("../models/inviteRecord");
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("article");
let utils = require("utility");
let rewards = require("../utils/constants").REWARDS;

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
        await userMapper.updateIonCoin(inviter.userid, rewards.invite.amount);
        await userInviteMapper.save(userInvite);
        let coinDetail = {};
        coinDetail.userid = inviter.userid;
        coinDetail.type = rewards.invite.type;
        coinDetail.amount = rewards.invite.amount;
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
        await userMapper.updateIonCoin(userId,rewards.register.amount);
        let coinDetail = {};
        coinDetail.userid = userId;
        coinDetail.type = rewards.register.type;
        coinDetail.amount = rewards.register.amount;
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
