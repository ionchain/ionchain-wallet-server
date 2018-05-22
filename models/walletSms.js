var db = require('../dbconnection'); //db
var uuid = require('node-uuid'); //uuid generator v1
var moment = require('moment'); //current time and so on

var WalletSms = {
    getAllWalletSms: function (callback) {
        return db.query("select * from wallet_sms", callback);
    },
    getWalletSmsById: function (id, callback) {
        return db.query("" +
            "select * from " +
            "wallet_sms " +
            "where id=?", [id], callback);
    },
    getLatestWalletSmsByMobile: function (type, mobile, callback) {
        return db.query("" +
            "select * from " +
            "wallet_sms " +
            "where type=? and mobile=? order by create_time desc limit 1", [type, mobile], callback);
    },
    addWalletSms: function (WalletSms, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        var id = uuid.v1();
        WalletSms.id = id;
        WalletSms.create_time = currentTime;
        var data = db.query("" +
            "insert into " +
            "wallet_sms" +
            "(id, wallet_user_id, mobile, validate_code, content, " +
            "create_time, dead_line, state, sended, type) " +
            " values(?,?,?,?,?,?,?,?,?,?)",
            [id, WalletSms.wallet_user_id, WalletSms.mobile, WalletSms.validate_code, WalletSms.content,
                WalletSms.create_time, WalletSms.dead_line, WalletSms.state, WalletSms.sended, WalletSms.type],
            callback);
        return data;
    },
    updateWalletSms: function (id, WalletSms, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        return db.query("" +
            " update wallet_sms " +
            " set sended = ?, update_time = ? " +
            " where id = ?", [WalletSms.sended, currentTime, id], callback);
    }
}

module.exports=WalletSms;