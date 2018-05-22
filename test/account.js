var Web3 = require('web3');
//var keystore = require("truffle-wallet-provider/keystore");


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}

//var newAccount = web3.personal.newAccount("glory");
var account = '0xfbdff3a235898de3faf28b18360812d55eb7d35b';
console.log("glory account :" + account);
console.log('account size : ' + web3.eth.accounts.length);
//console.log('accounts: ' + web3.eth.accounts);

var balance = web3.eth.getBalance('0xfbdff3a235898de3faf28b18360812d55eb7d35b').toNumber();
console.log('balance : '+ balance);
//var priateKey = keystore.getPrivateFromkeystore("374a18a2f946e691c0c064e646410399d4a2d34f", "123456789", datadir);
// console.info(priateKey);

