var db = require('../dbconnection');
var uuid = require('node-uuid');
var moment = require('moment');

var WalletUser = {
    getAllWalletUser: function (callback) {
        return db.query("select * from wallet_user", callback);
    },
    getWalletUserById: function (id, callback) {
        return db.query("" +
            "select * from " +
            "wallet_user " +
            "where id=?", [id], callback);
    },
    getWalletUserByUsername: function (username, callback) {
        return db.query("" +
            "select * from " +
            "wallet_user " +
            "where username=?", [username], callback);
    },
    getWalletUserByMobile: function (mobile, callback) {
        return db.query("" +
            "select * from " +
            "wallet_user " +
            "where mobile=?", [mobile], callback);
    },
    registry: function (WalletUser, callback) {
        var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        var data = db.query("" +
            "insert into " +
            "wallet_user" +
            "(id, mobile, password, create_time, update_time, invited_code) " +
            " values(?,?,?,?,?,?)",
            [uuid.v1(), WalletUser.mobile, WalletUser.password, currentTime, currentTime, WalletUser.invited_code],
            callback);
        return data;
    },
    addWalletUser: function (WalletUser, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        var data = db.query("" +
            "insert into " +
            "wallet_user" +
            "(id, username, mobile, password, create_time, " +
            "update_time,invite_code,invited_code, source) " +
            " values(?,?,?,?,?,?,?,?,?)",
            [uuid.v1(), WalletUser.username, WalletUser.mobile, WalletUser.password, currentTime,
                currentTime, WalletUser.invite_code, WalletUser.invited_code, WalletUser.source],
            callback);
        return data;
    },
    deleteWalletUserById: function (id, callback) {
        return db.query("" +
            " delete from " +
            " wallet_user " +
            " where id=?", [id], callback);
    },
    updateWalletUser: function (id, WalletUser, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        return db.query("" +
            " update wallet_user " +
            " set update_time = ? " +
            " where id = ?", [currentTime, id], callback);
    },
    deleteAll: function (item, callback) {
        var delarr = [];
        for (i = 0; i < item.length; i++) {
            delarr[i] = item[i].Id;
        }
        return db.query("delete from wallet_user where id in (?)", [delarr], callback);
    }
}

module.exports=WalletUser;