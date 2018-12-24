var express = require('express');
var router = express.Router();

var mall = require('../models/appApplicationMall');
var screen = require('../models/appScreenShot');


var PagingInfo = require('../models/PagingInfo');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');

//查询方法
router.get('/:id?', function(req, res, next){
    if(req.params.id){
        mall.getMallAppById(req.params.id, function (err, rows) {
            var responseMessage = new ResponseMessage();
            if(err && rows.size!=1) {
                responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
            } else {
                console.info(rows[0]);
                screen.findByMallId(req.params.id, function (err, screens) {
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


module.exports = router;