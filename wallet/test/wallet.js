var Wallet = require('../');
var optfile = require('../optfile');

module.exports = {
    //创建钱包
    newWallet: function () {
        var wallet = Wallet.generate(true);
        // var publicKey = wallet.getPublicKey().toString("hex");
        // var address = wallet.getAddress().toString("hex");
        // var privateKey = wallet.getPrivateKey().toString("hex");
        //console.log("public key: " + publicKey);
        //console.log("private key: " + privateKey);
        //console.log("address: " + address);
        return wallet;
    },
    //通过privateKey加载钱包；privateKey:c5793c94a6ab832fb89c550a190407e7709f24dac9e8a11727579400548c7b23
    loadWalletByPrivateKey: function (privateKey) {
        var fixturekey = Buffer.from(privateKey, 'hex')
        var fixturewallet = Wallet.fromPrivateKey(fixturekey);
        //console.log("private key :" + fixturewallet.getPrivateKey().toString("hex"));
        return fixturewallet;
    },
    //生成keyStore文件 password, path : ../db/
    generateKeyStore: function (fixturewallet ,password, path) {
        var keyStore = fixturewallet.toV3("glory");
        //console.info(keyStore)
        optfile.writeFile(path + fixturewallet.getV3Filename(), keyStore);
        return keyStore;
    },
    //通过密码和keyStore文件获得钱包
    loadWalletByKeyStore: function (password, path) {
        var keyStore = optfile.readfileSync(path);
        //console.log(keyStore);
        var wallet = Wallet.fromV3(keyStore, password);
        //console.log(wallet.getPrivateKey().toString("hex"));
        return wallet;
    }
}




