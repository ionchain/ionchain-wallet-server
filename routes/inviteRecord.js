let express = require("express");
let router = express.Router();
let inviteRecordMapper = require("../models/inviteRecord");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("inviteRecord");

/**
 * Find invite records
 * @param {int} pageNo (default 1)
 * @param {int} pageSize (default 10)
 * @userId {int} inviteCode
 * @return {object}
 */
router.post("/inviteRecord/findAll", (req, res) => {
    let pageNo = parseInt(req.body.pageNo) || 1;
    let pageSize = parseInt(req.body.pageSize) || 10;
    let inviteCode = req.body.inviteCode;
    let responseMessage = new ResponseMessage();
    if(!inviteCode){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"邀请码不能为空!");
        return res.json(responseMessage);
    }
    inviteRecordMapper.findByInviteCode(inviteCode,(pageNo - 1) * pageSize, pageSize).then(rows=>{
        inviteRecordMapper.findCountByInviteCode(inviteCode).then(count=>{
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