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
        WalletUser.getAllWalletUser(function(err, rows){
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
    console.log("req:" + req);
    WalletUser.addWalletUser(req.body, function(err, count){
        console.log("err: " + err);
        console.log("count:" + count);
        if(err)
        {
            res.json(err);
        } else {
            res.json(req.body);//or return count for 1 & 0
        }
    });
});


 router.post('/:id', function(req, res, next){
     WalletUser.deleteAll(req.body,function(err,count){
         if(err) {
            res.json(err);
         } else {
             res.json(count);
         }
     });
});


router.delete('/:id',function(req,res,next){
    WalletUser.deleteWalletUserById(req.params.id,function(err,count){
        if(err)
        {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});


router.put('/:id',function(req,res,next){

    WalletUser.updateWalletUser(req.params.id, req.body, function(err, rows){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

module.exports=router;