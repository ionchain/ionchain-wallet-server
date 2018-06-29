let express = require("express");
let router = express.Router();
let articleMapper = require("../models/article");
let userMapper = require('../models/user');
let ResponseMessage = require('../models/ResponseMessage');
let Status = require('../models/Status');
let utils = require('utility');
let log4js = require('log4js');
log4js.configure('config/log4j.json');
let logger = log4js.getLogger("article");
let dateUtils = require("../utils/dateUtils");
let config = require("../config/config.json");

/**
 * Find articles
 * @param {int} pageNo (default 1)
 * @param {int} pageSize (default 10)
 * @userId {int} user's Id
 * @return {object}
 */
router.post("/article/findAll", (req, res) => {
    let pageNo = parseInt(req.body.pageNo) || 1;
    let pageSize = parseInt(req.body.pageSize) || 10;
    let userId = req.body.userId;
    let responseMessage = new ResponseMessage();
    articleMapper.findAll(userId,(pageNo - 1) * pageSize, pageSize).then(rows=>{
        articleMapper.findCount().then(count=>{
            for(let i = 0 ; i < rows.length ; i ++){
                rows[i].url = config.host+"/article/"+rows[i].id;
            }
            responseMessage.success(rows,"操作成功!",count[0]);
            return res.json(responseMessage);
        }).catch(error=>{
            logger.error(error);
            responseMessage.exception(Status.EXCEPTION_QUERY);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
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
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
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
            logger.error(error);
            responseMessage.exception(Status.EXCEPTION_UPDATE);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
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
                logger.error(error);
                responseMessage.exception(Status.EXCEPTION_ADD);
                return res.json(responseMessage);
            })
        }).catch(error=>{
            logger.error(error);
            responseMessage.exception(Status.EXCEPTION_UPDATE);
            return res.json(responseMessage);
        })
    }).catch(error=>{
        logger.error(error);
        responseMessage.exception(Status.EXCEPTION_QUERY);
        res.json(responseMessage);
    })
});

/**
 * Article web page
 * @param {int} id
 */
router.get("/article/:id",function (req,res) {
    let articleId = req.params.id;
    articleMapper.findArticleById(articleId).then(row=>{
        if(!row || row.length === 0){
            return res.render('404', { msg: '文章不存在!' });
        }
        row[0].createTime =dateUtils.dateDiff(row[0].createTime);
        row[0].content = row[0].content.replace(/\/ionchain-cms-manager/g,'http://walletapi.ionchain.org');
        res.render('article/index', row[0]);
    }).catch(error=>{
        logger.error(error);
        return res.render('404', { msg: '服务器内部错误!' });
    });
});

module.exports = router;