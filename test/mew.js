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

//create a empty wallet
//var wallet = Wallet.generate();
//console.log(wallet.getPrivateKey().toString('hex'));
//console.log(wallet.getPublicKey());
//console.log(wallet.getAddress());

//import a wallet via privateKey
var fixturekey = Buffer.from('efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378', 'hex')
var fixturewallet = Wallet.fromPrivateKey(fixturekey);
console.log(fixturewallet.getPrivateKey().toString('hex'));
console.log(fixturewallet.getPublicKey().toString('hex'));
console.log(fixturewallet.getAddress().toString('hex'));

//generate a keystore content via password
console.log(fixturewallet.toV3('glory00004'));

//creates a keystore filename via timestamp
var timestamp = new Date();
console.log(fixturewallet.getV3Filename(timestamp));

//