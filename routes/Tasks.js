var express = require('express');
var router = express.Router();
var Task=require('../models/Task');

var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');

router.get('/:id?',function(req,res,next){

if(req.params.id){

    Task.getTaskById(req.params.id,function(err,rows){
        var responseMessage = new ResponseMessage();
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
        }
        else
        {
            responseMessage.success(rows,null);
        }
        res.json(responseMessage);
    });
}
else{

 Task.getAllTasks(function(err,rows){
        var responseMessage = new ResponseMessage();
        if(err)
        {
            responseMessage.exception(STATUS.EXCEPTION_QUERY,null);
        }
        else
        {
            responseMessage.success(rows,null);
        }
        res.json(responseMessage);
 });
}
});
router.post('/',function(req,res,next){

        Task.addTask(req.body,function(err,count){

            //console.log(req.body);
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(req.body);//or return count for 1 & 0
            }
        });
});
 router.post('/:id',function(req,res,next){
  Task.deleteAll(req.body,function(err,count){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(count);
    }
  });
});
router.delete('/:id',function(req,res,next){

        Task.deleteTask(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
router.put('/:id',function(req,res,next){

    Task.updateTask(req.params.id,req.body,function(err,rows){

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