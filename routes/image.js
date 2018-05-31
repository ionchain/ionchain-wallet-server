var express = require('express')
var optfile =  require('../wallet/optfile');
var config = require('../config/config');

var router = express.Router();


router.get('/:date?/:name?', function(req, res) {
    var date = req.params.date;
    var name = req.params.name;
    console.info('date: ' + date);
    console.info('name: ' + name);
    console.info('imageDir :' + config.imageDir)
    optfile.readImg((config.imageDir + date + '/' + name),res);

});

module.exports = router;
