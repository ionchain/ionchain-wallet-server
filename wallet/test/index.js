var assert = require('assert')
var Buffer = require('safe-buffer').Buffer
var Wallet = require('../')
var Thirdparty = require('../thirdparty.js')
var ethUtil = require('ethereumjs-util')
var optfile = require('../optfile');


console.log("hello world!");

//创建钱包
// var wallet = Wallet.generate(true);
// var publicKey = wallet.getPublicKey().toString("hex");
// var address = wallet.getAddress().toString("hex");
// var privateKey = wallet.getPrivateKey().toString("hex");
// console.log("public key: " + publicKey);
// console.log("private key: " + privateKey);
// console.log("address: " + address);


//通过privateKey加载钱包；
//示例privateKey:c5793c94a6ab832fb89c550a190407e7709f24dac9e8a11727579400548c7b23
var fixturekey = Buffer.from('c5793c94a6ab832fb89c550a190407e7709f24dac9e8a11727579400548c7b23', 'hex')
var fixturewallet = Wallet.fromPrivateKey(fixturekey);
console.log("private key :" + fixturewallet.getPrivateKey().toString("hex"));

var timestamp = new Date();
var v3Filename = fixturewallet.getV3Filename(timestamp);
console.log("timestamp : " + timestamp + ";v3Filename: " + v3Filename);

function recall(data){
    console.info("recall data : " + data);
}

//生成keyStore文件
// var keyStore = fixturewallet.toV3("glory");
// console.info(keyStore)
// optfile.writeFile("../db/"+v3Filename, keyStore, recall);

//通过密码和keyStore文件获得钱包
var keyStore = optfile.readfileSync("../db/UTC--2018-05-24T03-45-37.335Z--05e2769342e5afbe52a0997a29aac03302b065df");
console.log(keyStore);
var wallet = Wallet.fromV3(keyStore, 'glory');
console.log(wallet.getPrivateKey().toString("hex"));





