let express = require("express");
let router = express.Router();
let version = require("../models/version");
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("user");

/**
 * Find version info
 * @return {object}
 */
router.get("/info",function (req,res) {
    let responseMessage = new ResponseMessage();
    version.getVersionInfo().then(rows=>{
        responseMessage.success(rows);
        res.json(responseMessage);
    }).catch(error=>{
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
        res.json(responseMessage);
    })
});

module.exports = router;