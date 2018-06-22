let express = require("express");
let router = express.Router();
let coinRecordMapper = require("../models/coinRecord");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("coinRecord");

/**
 * Find coin records
 * @param {int} pageNo (default 1)
 * @param {int} pageSize (default 10)
 * @userId {int} user's Id
 * @return {object}
 */
router.post("/coinRecord/findAll", (req, res) => {
    let pageNo = req.body.pageNo || 1;
    let pageSize = req.body.pageSize || 10;
    let userId = req.body.userId;
    let responseMessage = new ResponseMessage();
    if(!userId){
        responseMessage.exception(Status.EXCEPTION_PARAMS,"用户ID不能为空!");
        return res.json(responseMessage);
    }
    coinRecordMapper.findByUserId(userId,(pageNo - 1) * pageSize, pageSize).then(rows=>{
        coinRecordMapper.findCountByUserId(userId).then(count=>{
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