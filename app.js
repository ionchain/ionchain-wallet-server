var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('./config/config');
var indexRouter = require('./routes/index');
var tasks = require('./routes/Tasks');
var walletUser = require('./routes/walletUser');
var walletSms = require('./routes/walletSms');
var walletToken = require('./routes/walletToken');
var News = require('./routes/news');
var article = require('./routes/article');
var image = require('./routes/image');
let user = require('./routes/user');
let sms = require('./routes/sms');



var signature = require('./models/SignatureVerfy');

var app = express();

app.all('/*', function(request, response, next){
    //开启签名验证
  if(config.signatureFlag){
      signature.verify(request, response, next);
  } else {
      next();
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', walletUser);
app.use('/tasks',tasks);
app.use('/sms',walletSms);
app.use('/token',walletToken);
app.use('/news', News);
app.use('/article', article);
app.use('/jflyfox/bbs/ueditor/image', image);
app.use('/',user);
app.use("/",sms);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function () {
    console.log("app listen on 3000");
})


module.exports = app;
