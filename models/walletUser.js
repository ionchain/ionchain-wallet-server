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
                    "where id=?",[id], callback);
    },
    getWalletUserByUsername: function (username, callback) {
        return db.query("" +
            "select * from " +
                "wallet_user " +
                    "where username=?",[username], callback);
    },
    getWalletUserByMobile: function (mobile, callback) {
        return db.query("" +
            "select * from " +
                "wallet_user " +
                    "where mobile=?",[mobile], callback);
    },
    addWalletUser: function (WalletUser, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        var data = db.query("" +
            "insert into " +
                "wallet_user" +
                    "(id,username, mobile, password, create_time, " +
                    "update_time,invite_code,invited_code, source) " +
                " values(?,?,?,?,?,?,?,?,?)",
            [uuid.v1(), WalletUser.username, WalletUser.mobile, WalletUser.password, currentTime,
                currentTime, WalletUser.invite_code, WalletUser.invited_code, WalletUser.source],
            callback);
        return data;
    },
    deleteWalletUserById: function (id, callback) {
        return db.query("" +
            "delete from " +
                "wallet_user " +
                    "where id=?", [id], callback);
    },
    updateWalletUser: function (id, WalletUser, callback) {
       return db.query("" +
           "update wallet_user " +
                "set update_time = ? " +
                    "where id = ?",[WalletUser.update_time, id],callback);
    },
    deleteAll:function(item, callback){
        var delarr=[];
        for(i=0;i<item.length;i++){
            delarr[i]=item[i].Id;
        }
        return db.query("delete from wallet_user where id in (?)",[delarr],callback);
    }
}
module.exports=WalletUser;