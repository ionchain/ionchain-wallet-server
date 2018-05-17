var moment = require('moment');
var fs = require('fs');

console.log(moment().format('dddd'));

console.log(moment().format('YYYY-MM-DD hh:mm:ss'));

var localAppkey = fs.readFileSync('../certificate/pubkey.pem','utf-8');
console.log(localAppkey);

var array = [];
array.push('a');
array.push('e');
array.push('b');
array.push('101');
array.push('1');
array.sort();
console.log(array);


