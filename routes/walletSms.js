var express = require('express');
var router = express.Router();

var WalletSms = require('../models/WalletSms');
var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');

router.get('/:id?', function(req, res, next){
    if(req.params.id){
        WalletSms.getWalletSmsById(req.params.id, function (err, rows) {
            var responseMessage = new ResponseMessage();
            if(err) {
                responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
            } else {
                responseMessage.success(rows,null);
            }
            res.json(responseMessage);
        });
    } else {
        WalletSms.getAllWalletSms(function(err, rows){
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

    WalletSms.addWalletSms(req.body, function(err, result){

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



router.put('/:id',function(req,res,next){

    var responseMessage = new ResponseMessage();

    WalletSms.updateWalletSms(req.params.id, req.body, function(err, rows){
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

module.exports=router;