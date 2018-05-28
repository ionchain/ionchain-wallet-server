var Web3 = require("web3");



//初始化web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


//所有账户
console.info(web3.eth.getAccounts(function (err, result) {
    if(!err){console.info("accounts: " + result);}
}));


//单位转换示例
var balance = web3.eth.getBalance(web3.eth.coinbase);
console.info("balance in wei : " + balance)
console.info("balance in finney: " + web3.fromWei(balance, 'finney'));
console.info("balance in ether: " + web3.fromWei(balance, 'ether'));
