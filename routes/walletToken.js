var express = require('express');
var router = express.Router();

var WalletToken = require('../models/WalletToken');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');

router.get('/:id?', function(req, res, next){
    if(req.params.id){
        WalletToken.getWalletTokenById(req.params.id, function (err, rows) {
            var responseMessage = new ResponseMessage();
            if(err) {
                responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
            } else {
                responseMessage.success(rows,null);
            }
            res.json(responseMessage);
        });
    } else {
        WalletToken.getAllWalletToken(function(err, rows){
            var responseMessage = new ResponseMessage();
            if(err)
            {
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

    WalletToken.addWalletToken(req.body, function(err, count){

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


router.delete('/:id',function(req, res, next){

    var responseMessage = new ResponseMessage();
    WalletToken.deleteWalletTokenById(req.params.id,function(err,count){
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_DELETE, err);
        } else {
            responseMessage.success(count, null);
        }
        res.json(responseMessage);
    });
});


router.put('/:id', function(req, res, next){

    var responseMessage = new ResponseMessage();

    WalletToken.updateWalletToken(req.params.id, req.body, function(err, rows){
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