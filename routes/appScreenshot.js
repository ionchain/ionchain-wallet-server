var express = require('express');
var router = express.Router();
var multer  = require('multer');


var ResponseMessage = require('../models/ResponseMessage');
var STATUS = require('../models/Status');
var fs = require("fs");
var upload = multer({dest: 'upload_tmp/'});

//新增应用
router.post('/', upload.any(), function(req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息

    var des_file = "./public/upload/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
                console.log( response );
                res.end(JSON.stringify( response ) );
            }
        });
    });
});


module.exports = router;