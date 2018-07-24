let express = require("express");
let router = express.Router();
let inviteRecordMapper = require("../models/inviteRecord");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("inviteRecord");
let rewards = require("../utils/constants").REWARDS;

/**
 * Find myInviteRewardAmount
 * @userId {int} inviteCode
 * @return {object}
 */
router.post("/inviteRecord/myInviteRewardAmount", (req, res) => {
    let inviteCode = req.body.inviteCode;
    let responseMessage = new ResponseMessage();
    if(!inviteCode){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"邀请码不能为空!");
        return res.json(responseMessage);
    }
    inviteRecordMapper.findCountByInviteCode(inviteCode).then(count=>{
        //总奖励 = 邀请人数 * 邀请奖励
        responseMessage.success(count[0].totalCount * rewards.invite.amount,"操作成功!");
        return res.json(responseMessage);
    }).catch(error=>{
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
        return res.json(responseMessage);
    })
});

/**
 * Find invite rating
 * @param {int} pageNo (default 1)
 * @param {int} pageSize (default 10)
 * @return {object}
 */
router.post("/inviteRecord/rating", (req, res) => {
    let pageNo = parseInt(req.body.pageNo) || 1;
    let pageSize = parseInt(req.body.pageSize) || 10;
    let responseMessage = new ResponseMessage();
    inviteRecordMapper.findAll((pageNo - 1) * pageSize, pageSize).then(rows=>{
        inviteRecordMapper.findCount().then(count=>{
            //总奖励 = 邀请人数 * 邀请奖励
            for(var i=0;i<rows.length;i++){
                rows[i].amount *= rewards.invite.amount;
            }
            responseMessage.success(rows,"操作成功!",count[0]);
            return res.json(responseMessage);
        }).catch(error=>{
            logger.error(error);
            responseMessage.exception(Status.EXCEPTION_QUERY);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
        return res.json(responseMessage);
    })
});

module.exports = router;