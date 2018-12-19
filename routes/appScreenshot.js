var express = require('express');
var router = express.Router();

var PagingInfo = require('../models/PagingInfo');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');
var fs = require("fs");

//新增应用
router.post('/', function (req, res, next) {
    var responseMessage = new ResponseMessage();
    console.log(req.files);
    // 传多张
    "use strict";
    for (let i = 0; i < req.files.length; i++) {
        var file = req.files[i];
        var oldPath = "public/" + file.filename;
        var newPath = "public/" + file.filename + ".jpg";
        var result = fs.renameSync(oldPath, newPath);
        if (result == undefined) {
            if (i == req.files.length - 1) {
                res.send("所有图片上传成功")
            }
        } else {
            res.send(`第${i}图片上传成功`);
        }
    }
    responseMessage.success(req.files, null);
});


module.exports = router;