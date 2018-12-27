var express = require('express');
var router = express.Router();

var mall = require('../models/appApplicationMall');
var screen = require('../models/appScreenShot');
var moment = require('moment');


var PagingInfo = require('../models/PagingInfo');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');
var fs = require("fs");
var multer  = require('multer');
var upload = multer({dest: 'upload_tmp/'});
var config = require('../config/config');

var mkdirp = require('mkdirp');
var path = require('path');  /*nodejs自带的模块*/

//查询方法
router.get('/:id?', function(req, res, next){
    if(req.params.id){
        mall.getMallAppById(req.params.id, function (err, rows) {
            var responseMessage = new ResponseMessage();
            if(err && rows.size!=1) {
                responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
            } else {
                console.info(rows);
                screen.findByMallId(req.params.id, '1', function (err, screens) {
                    var result = {};
                    result.mall = rows[0];
                    result.screens = screens;
                    responseMessage.success(result,null);
                    res.json(responseMessage);
                });
            }
        });
    } else {
        var pagingInfo = new PagingInfo();

        var current_page = 1; //默认为1
        var pageSize = 5; //一页条数
        if (req.query.pageNumber) {
            current_page = parseInt(req.query.pageNumber);
        }
        if (req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize);
        }
        mall.getAllMallApp(pageSize, pageSize * (current_page - 1), function(err, rows){
            var responseMessage = new ResponseMessage();
            if(err)
            {
                responseMessage.exception(STATUS.EXCEPTION_QUERY, null);
                res.json(responseMessage);
            }
            else
            {
                mall.getTotalCount(function (err, totalCount) {
                    if(err)
                    {
                        responseMessage.exception(STATUS.EXCEPTION_QUERY, err.toString());
                        res.json(responseMessage);
                    } else
                    {
                        pagingInfo.success(totalCount[0].totalCount, current_page, pageSize, rows);
                        responseMessage.success(pagingInfo, null, null);
                        res.json(responseMessage);
                    }
                });
                responseMessage.success(rows, null);
            }
        });
    }
});


//新增应用
router.post('/', function(req, res, next){

    var responseMessage = new ResponseMessage();

    mall.addMallApp(req.body, function(err, result){

        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_ADD, err);
        }
        else
        {
            responseMessage.success(result, null);
        }
        res.json(responseMessage);
    });
});


//更新应用
router.put('/:id', function(req, res, next){
    var responseMessage = new ResponseMessage();
    mall.updateMallApp(req.params.id, req.body, function(err, result){
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_ADD, err);
        }
        else
        {
            responseMessage.success(result, null);
        }
        res.json(responseMessage);
    });
});

//应用启停
router.put('/:id/:status', function(req, res, next){
    var responseMessage = new ResponseMessage();
    var id = req.params.id;
    var status = req.params.status;
    mall.updateStatus(id, status, function(err, result){
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_ADD, err);
        }
        else
        {
            responseMessage.success(result, null);
        }
        res.json(responseMessage);
    });
});


//logo上传
router.post('/:mallId', upload.any(), function(req, res, next){
    var mallId = req.params.mallId;
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
    var originalname = req.files[0].originalname;
    var extname=path.extname(originalname);	 //获取文件的后缀名
    var sysname = mallId+"-logo"+extname
    var des_file = des_dir + sysname;
    var relative_file = des_sys_dir + sysname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if(err){
                console.log( err );
                responseMessage.exception(STATUS.EXCEPTION_ADD,"上传失败，请检查并重新上传！");
            }
            // console.info(mallId);
            // console.info(relative_file);
            mall.updateLogo(mallId, relative_file, function(err, result){
                if(err)
                {
                    responseMessage.exception(STATUS.EXCEPTION_ADD, err);
                }
                else
                {
                    responseMessage.success(result, null);
                }
                res.json(responseMessage);
            });
        });
    });
});

//截图预览
router.get('/image/:id', function(req, res, next){
    var responseMessage = new ResponseMessage();
    // console.info(req.params.id);
    mall.getMallAppById(req.params.id,function(err, rows){
        // console.info(req.params.id);
        // console.info(err);
        // console.info(rows);
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_ADD, err);
        }
        else
        {
            var des_dir = config.imageUploadDir + rows[0].logo_url;
            res.sendFile(des_dir);
        }
    });
});


module.exports = router;