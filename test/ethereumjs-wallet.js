/****
 * 首先参考市面上基于以太坊的钱包，比如imtoken、zag、smartMesh
 * 1，如果离线生成一个以太坊钱包
 * 2，如何离线导入一个以太坊钱包
 * 3，查询以太坊余额
 * 4，根据代币合约地址查询代币余额
 * 5，如何转账以太坊
 * 6，如何转账代币
 * 7，如何查询交易记录
 * 8，如何查询交易详情这些问题解决了，就行了。以太坊接口
 * @type {Wallet}
 */
var Wallet = require('ethereumjs-wallet');

var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}
// var key = Buffer.from('efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378', 'hex');
// var wallet = Wallet.fromPrivateKey(key);
// var password = wallet.toV3String('password');
// console.log('wallet: ' + Wallet);
// console.log('key : ' + key);
// console.log('password : ' + password);

//var wallet = Wallet.generate();
//var key = wallet.getPrivateKey();
//<Buffer b7 9a d0 a7 7f ce 2c 4d d6 82 c9 6d 9e 05 25 d3 e2 55 e7 81 8e 99 d0 07 82 6f ba a4 cb 2f 0b 25>
console.log(key);
console.info(key.length);