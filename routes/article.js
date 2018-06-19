let express = require("express");
let router = express.Router();
let articleMapper = require("../models/article");
let userMapper = require('../models/user');
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let utils = require('utility');

/**
 * Find articles
 * @param {int} pageNo (default 1)
 * @param {int} pageSize (default 10)
 * @userId {int} user's Id
 * @return {object}
 */
router.post("/article/findAll", (req, res) => {
    let pageNo = req.body.pageNo || 1;
    let pageSize = req.body.pageSize || 10;
    let userId = req.body.userId;
    let responseMessage = new ResponseMessage();
    articleMapper.findAll(userId,(pageNo - 1) * pageSize, pageSize).then(rows=>{
        articleMapper.findCount().then(count=>{
            responseMessage.success(rows,"操作成功!",count[0]);
            return res.json(responseMessage);
        }).catch(error=>{
            responseMessage.exception(Status.EXCEPTION_QUERY,error);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        return res.json(responseMessage);
    })
});

/**
 * Find article details
 * @param {int} articleId
 * @return {object}
 */
router.post("/article/detail",function (req,res) {
    let articleId = req.body.articleId;
    let responseMessage = new ResponseMessage();
    articleMapper.findArticleById(articleId).then(row=>{
        if(!row || row.length === 0){
            responseMessage.exception(Status.EXCEPTION_QUERY,"文章不存在,请检查后再发!");
            return res.json(responseMessage);
        }
        responseMessage.success(row[0]);
        return res.json(responseMessage);
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        return res.json(responseMessage);
    })
});

/**
 * View article
 * @param {int} articleId
 * @return {object}
 */
router.post("/article/view",function (req,res) {
    let articleId = req.body.articleId;
    let responseMessage = new ResponseMessage();
    articleMapper.findArticleById(articleId).then(row=>{
        if(!row || row.length === 0){
            responseMessage.exception(Status.EXCEPTION_QUERY,"文章不存在,请检查后再发!");
            return res.json(responseMessage);
        }
        articleMapper.IncreaseViewCount(articleId).then(row=>{
            responseMessage.success();
            return res.json(responseMessage);
        }).catch(error=>{
            responseMessage.exception(Status.EXCEPTION_UPDATE,error);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        return res.json(responseMessage);
    })
});

/**
 * Praise article
 * @param {int} articleId
 * @param {int} userId
 * @return {object}
 */
router.post("/article/praise",function (req,res) {
    let articleId = req.body.articleId;
    let userId = req.body.userId;
    let articleLike = {};
    articleLike.article_id = articleId;
    articleLike.create_id = userId;
    articleLike.create_time = utils.YYYYMMDDHHmmss();
    let responseMessage = new ResponseMessage();
    articleMapper.findArticleById(articleId).then(row=>{
        if(!row || row.length === 0){
            responseMessage.exception(Status.EXCEPTION_QUERY,"文章不存在,请检查后再发!");
            return res.json(responseMessage);
        }
        userMapper.findById(userId).then(row=>{
            if(!row || row.length === 0){
                responseMessage.exception(Status.EXCEPTION_QUERY,"用户信息不存在,请检查后再发!");
                return res.json(responseMessage);
            }
            articleMapper.IncreasePraiseCount(articleLike).then(row=>{
                responseMessage.success();
                return res.json(responseMessage);
            }).catch(error=>{
                responseMessage.exception(Status.EXCEPTION_ADD,error);
                return res.json(responseMessage);
            })
        }).catch(error=>{
            responseMessage.exception(Status.EXCEPTION_UPDATE,error);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        responseMessage.exception(Status.EXCEPTION_QUERY,error);
        res.json(responseMessage);
    })
});

module.exports = router;