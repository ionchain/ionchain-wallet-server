var db = require('../dbconnection');
var uuid = require('node-uuid');
var moment = require('moment');

var WalletToken = {
    getAllWalletToken: function (callback) {
        return db.query("select * from wallet_token", callback);
    },
    getWalletTokenById: function (id, callback) {
        return db.query("" +
            "select * from" +
                " wallet_token" +
                    " where id=?", [id], callback);
    },
    getWalletTokenByName: function (name, callback) {
        return db.query("" +
            "select * from " +
                " wallet_token " +
                     " where name=?", [name], callback);
    },
    addWalletToken: function (WalletToken, callback) {
        var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        var data = db.query("" +
            "insert into " +
                "wallet_token(id, name, symbol, create_time, update_time, address, decimals) " +
                " values(?,?,?,?,?,?,?)",
            [uuid.v1(), WalletToken.name, WalletToken.symbol, currentTime, currentTime, WalletToken.address, WalletToken.decimals],
            callback);
        return data;
    },
    deleteWalletTokenById: function (id, callback) {
        return db.query("delete from " +
                            " wallet_token " +
                                " where id=?", [id], callback);
    },
    updateWalletToken: function (id, WalletToken, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        return db.query("" +
            " update wallet_token " +
                " set name=?,symbol=?,address=?,decimals=?,update_time = ? " +
                    " where id = ?", [WalletToken.name, WalletToken.symbol,
            WalletToken.address, WalletToken.decimals,currentTime, id], callback);
    },
    deleteAll: function (item, callback) {
        var delarr = [];
        for (i = 0; i < item.length; i++) {
            delarr[i] = item[i].Id;
        }
        return db.query("delete from wallet_token where id in (?)", [delarr], callback);
    }
}

module.exports=WalletToken;