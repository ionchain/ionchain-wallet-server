var express = require('express');
var router = express.Router();

var mall = require('../models/appApplicationMall');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');

router.get('/:id?', function(req, res, next){
    if(req.params.id){
        mall.getMallAppById(req.params.id, function (err, rows) {
            var responseMessage = new ResponseMessage();
            if(err) {
                responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
            } else {
                responseMessage.success(rows,null);
            }
            res.json(responseMessage);
        });
    } else {
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
                console.info(err);
                responseMessage.exception(STATUS.EXCEPTION_QUERY, null);
            }
            else
            {
                responseMessage.success(rows, null);
            }
            res.json(responseMessage);
        });
    }
});

module.exports = router;