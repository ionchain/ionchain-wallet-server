let express = require("express");
let router = express.Router();
let ResponseMessage = require('../models/ResponseMessage');
let config = require('../config/config.json');

/**
 * 系统信息
 * @return {object}
 */
router.post("/sys/info", (req, res) => {
    let responseMessage = new ResponseMessage();
    let sysInfo = {};
    sysInfo.contractAddress = config.contractAddress;
    sysInfo.providerUrl = config.providerUrl;
    responseMessage.success(sysInfo);
    return res.json(responseMessage);
});

module.exports = router;

