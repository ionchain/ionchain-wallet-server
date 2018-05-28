var Web3 = require("web3"); //引入web3支持，我本地使用的是web3^0.18.4
var fs = require("fs"); //引入文件读取支持
var ethereumjsWallet = require('ethereumjs-wallet'); //引入以太坊nodejs操作钱包支持
var Tx = require("ethereumjs-tx"); //引入以太坊js交易支持


//初始化web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //我本地的私有链信息
    //启用命令：> geth --networkid 1108 --nodiscover --datadir ./ --rpc --rpcapi net,eth,web3,personal --rpcaddr 127.0.0.1 --rpcport 8545 console
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Read and unlock keystore
var keystore = fs.readFileSync('/Users/yves/ethereum/privateChain/keystore/UTC--2018-05-22T11-48-03.459005936Z--0df14334e094acc0197d52a415d799c2b8a3b04b').toString();
// 账户密码
var pass = "aaaaaaaa";
// 通过keystore与密码得到钱包对象
var wallet = ethereumjsWallet.fromV3(keystore, pass);
var privateKey = wallet.getPrivateKey();
//打印当前钱包privateKey
console.info("private key : " + privateKey);

//通过交易参数
var rawTx = {
    nonce: 11,//随机数，在测试时需要不断递加
    gasPrice: 50000000000,//gas价格
    gasLimit:  200000,//gas配额
    to: '0x18f54aade5dde6ce3772b78b293d76c25d874f92',//转账到哪个账户
    value: web3.toWei(10000000, 'wei'),//以太币数量
    data: ''
};
//构造此交易对象
var tx = new Tx(rawTx);
//发起人私钥签名
tx.sign(privateKey);
//交易序列化
var serializedTx = tx.serialize();
//执行交易
web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    console.log('transaction id ：'+hash);
    console.log(err);
});

