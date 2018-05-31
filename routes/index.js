var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('date?/name?', function(req, res) {
    console.info('path: ' + req.params.date);
});

module.exports = router;
