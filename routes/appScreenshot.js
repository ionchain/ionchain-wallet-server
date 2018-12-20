var express = require('express');
var router = express.Router();
var multer  = require('multer');
var moment = require('moment');
var screen = require('../models/appScreenShot');
var uuid = require('node-uuid');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');
var fs = require("fs");
var upload = multer({dest: 'upload_tmp/'});
var config = require('../config/config');

var mkdirp = require('mkdirp');
var path = require('path');  /*nodejs自带的模块*/
//新增应用
router.post('/:id?', upload.any(), function(req, res, next) {
    var mallId = req.params.id;
    var responseMessage = new ResponseMessage();
    var nowTime = moment().format('YYYYMMDDhhmmss');
    var des_sys_dir = nowTime + "/" + mallId + "/";
    //保存目录
    var des_dir = config.imageUploadDir + des_sys_dir;
    //不存在此目录，创建此目录
    if(!fs.existsSync(des_dir)){
        mkdirp.sync(des_dir, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('pow!');
            }
        });
    }
    var txBatchArray = [];
    for(var i = 0;i<req.files.length;i++){
        var originalname = req.files[i].originalname;
        var extname=path.extname(originalname);	 //获取文件的后缀名
        var sysname = mallId+"-"+(i+1)+extname
        var des_file = des_dir + sysname;
        var size = req.files[i].size;
        var txArray = [];
        //id, url, name, sys_name, size, create_time,update_time,status,app_mall_id
        txArray.push(uuid.v1());
        txArray.push(des_sys_dir);
        txArray.push(originalname);
        txArray.push(sysname);
        txArray.push(size);
        txArray.push(moment().format('YYYY-MM-DD hh:mm:ss'));
        txArray.push(moment().format('YYYY-MM-DD hh:mm:ss'));
        txArray.push('1');
        txArray.push(mallId);
        fs.readFile(req.files[i].path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                if(err){
                    console.log( err );
                    responseMessage.exception(STATUS.EXCEPTION_ADD,"上传失败，请检查并重新上传！");
                }
            });
        });
    }
    txBatchArray.push(txArray);
    screen.batchInsert(txBatchArray, function (error, result) {
        console.log("批量插入交易： " + error);
    });
    console.info(result);
    responseMessage.success(txBatchArray,null);
    res.json(responseMessage);
});


module.exports = router;