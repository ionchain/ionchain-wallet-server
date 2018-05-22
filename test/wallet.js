var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}

var version = web3.version.api;
console.log('api version: '+version);

var node = web3.version.node;
console.log('node: ' + node);

var coinbase = web3.eth.coinbase;
console.log('coinbase: ' + coinbase);

var balanceWei = web3.eth.getBalance(coinbase).toNumber();

var unitName = 'ether';
var balance = web3.fromWei(balanceWei, unitName);
console.log('balanceWei: ' + balanceWei);
console.log('balance: ' + balance);

web3.version.getNetwork(function (error, result) {
    console.log('error:' + error);
    console.log('network: ' + result);
});

//省略初始化过程
var version = web3.version.ethereum;
console.log('ethereum version:' + version);


//省略初始化过程
var hash = web3.sha3("Some string to be hashed");
console.log('hash: ' + hash);
var hashOfHash = web3.sha3(hash, {encoding: 'hex'});
console.log('hashOfHash:' + hashOfHash);

var BigNumber = require('bignumber.js');

var str = "abcABC";
var obj = {abc: 'ABC'};
var bignumber = new BigNumber('12345678901234567890');

var hstr = web3.toHex(str);
var hobj = web3.toHex(obj);
var hbg = web3.toHex(bignumber);

console.log("Hex of Sring:" + hstr);
console.log("Hex of Object:" + hobj);
console.log("Hex of BigNumber:" + hbg);


var mining = web3.eth.mining;
console.log('mining: '+mining); // true or false

var hashrate = web3.eth.hashrate;
console.log('hashrate: '+hashrate);

var accounts = web3.eth.accounts;
console.log('accounts: '+accounts);





