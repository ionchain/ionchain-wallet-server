var fs = require('fs');
var ResponseMessage = require('./ResponseMessage');
var STATUS = require('./Status');
var crypto=require('crypto');

module.exports = {
    verify:function(request, response, next){
        var responseMessage = new ResponseMessage();
        responseMessage = responseMessage.exception(STATUS.EXCEPTION_UNAUTHORIZED,'不合法的访问！');

        var appkey = request.header('appkey');
        var timestamp = request.header('timestamp');
        var nounce = request.header('nounce');
        var signature = request.header('signature');

        var localAppkey = fs.readFileSync('./certificate/pubkey.pem','utf-8').toString().trim();
        var localAppsecret = fs.readFileSync('./certificate/privkey.pem','utf-8').toString().trim();

        if(appkey==undefined || appkey.toString().trim()!=localAppkey.trim()){
            response.json(responseMessage);
            return;
        }

        if(timestamp==undefined || nounce==undefined || signature==undefined){
            response.json(responseMessage);
            return;
        }

        var array = [];
        array.push(timestamp);
        array.push(nounce);
        array.push(localAppsecret);
        array.sort();
        var str = '';
        for(var i=0;i<array.length;i++){
            str+=array[i];
        }
        var md5 = crypto.createHash("md5");
        md5.update(str);
        var localSignature = md5.digest('hex').toUpperCase();
        console.log(localSignature);
        if(localSignature.trim()!=signature){
            response.json(responseMessage);
            return;
        }
        next();
    }
}