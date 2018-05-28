var walletUtil = require('./wallet');

var wallet = walletUtil.newWallet();
//var wallet = walletUtil.loadWalletByPrivateKey("35bbf96f6cb1064618cfa28d8605bea8ec89cd267ae23c172080de2381da8c93");
console.log(wallet.getPrivateKey().toString("hex"));

var keyStore = walletUtil.generateKeyStore(wallet, "glory","../db/");
console.log(keyStore);

wallet = walletUtil.loadWalletByKeyStore("glory", "../db/UTC--2018-05-24T08-06-37.893Z--0337d0fc562bc86a6e3bf8ae657199743ef35037");
console.log(wallet.getPrivateKey().toString("hex"));

