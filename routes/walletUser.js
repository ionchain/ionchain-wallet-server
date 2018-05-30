var express = require('express');
var router = express.Router();

var WalletUser = require('../models/WalletUser');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');

router.get('/:id?', function(req, res, next){
    if(req.params.id){
        WalletUser.getWalletUserById(req.params.id, function (err, rows) {
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

        var last_page = current_page - 1;
        if (current_page <= 1) {
            last_page = 1;
        }
        var next_page = current_page + 1;
        console.info("current_page： "+ current_page);
        console.info("pageSize： " + pageSize);
        WalletUser.getAllWalletUser(pageSize, pageSize * (current_page - 1), function(err, rows){
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

router.post('/', function(req, res, next){

    var responseMessage = new ResponseMessage();

    WalletUser.registry(req.body, function(err, count){

        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_ADD, err);
        }
        else
        {
            responseMessage.success(req.body, null);
        }
        res.json(responseMessage);
    });
});


/* router.post('/:id', function(req, res, next){
     var responseMessage = new ResponseMessage();

     WalletUser.deleteAll(req.body,function(err,count){
         if(err) {
             responseMessage.exception(STATUS.EXCEPTION_DELETE, err);
         } else {
             responseMessage.success(count, null);
         }
         return responseMessage;
     });
});*/


router.delete('/:id',function(req, res, next){

    var responseMessage = new ResponseMessage();
    WalletUser.deleteWalletUserById(req.params.id,function(err,count){
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_DELETE, err);
        } else {
            responseMessage.success(count, null);
        }
        res.json(responseMessage);
    });
});


router.put('/:id',function(req,res,next){

    var responseMessage = new ResponseMessage();

    WalletUser.updateWalletUser(req.params.id, req.body, function(err, rows){
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_UPDATE, err);
        }
        else
        {
            responseMessage.success(rows, null);
        }
        res.json(responseMessage);
    });
});

module.exports = router;