var db = require('../dbconnection');
var uuid = require('node-uuid');
var moment = require('moment');

var MallApp = {
    getTotalCount: function (callback) {
        return db.query("" +
            "SELECT " +
            " count(t.id) as totalCount " +
            " FROM app_application_mall t ",callback);
    },
    getAllMallApp: function (num, offset, callback) {
        return db.query("select * from app_application_mall where status = 1 order by sorted_number asc limit ? offset ?", [num, offset], callback);
    },
    getMallAppById: function (id, callback) {
        return db.query("" +
            "select * from " +
                "app_application_mall " +
                    "where id=?", [id], callback);
    },
    getMallAppByName: function (name, callback) {
        return db.query("" +
            "select * from " +
                "app_application_mall " +
                    "where name like %?%", [name], callback);
    },
    addMallApp: function(MallApp, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        var data = db.query("" +
            "insert into " +
                "app_application_mall" +
                    "(id, name, type, introduction, version, update_time, create_time," +
                        "logo_url, app_url, app_score, package_name, app_id, owner, sorted_number,status) " +
            " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [uuid.v1(), MallApp.name, MallApp.type, MallApp.introduction, MallApp.version, currentTime, currentTime,
                        MallApp.logo_url, MallApp.app_url, MallApp.app_score,MallApp.package_name, MallApp.app_id,MallApp.owner, MallApp.sorted_number,MallApp.status],
            callback);
        return data;
    },
    deleteMallAppById: function (id, callback) {
        return db.query("" +
            " delete from " +
            " app_application_mall " +
            " where id=?", [id], callback);
    },
    updateMallApp: function (id, MallApp, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        return db.query("" +
            " update app_application_mall " +
            " set name = ?,type = ?,introduction = ?,version = ?,update_time = ?," +
            "   logo_url = ?,app_url = ?,app_score = ?,package_name = ?,app_id = ?,owner = ?,sorted_number = ?" +
            " where id = ?", [MallApp.name, MallApp.type, MallApp.introduction, MallApp.version, currentTime,
            MallApp.logo_url, MallApp.app_url, MallApp.app_score,MallApp.package_name, MallApp.appId,MallApp.owner, MallApp.sorted_number,id], callback);
    },
    updateStatus: function (id, status, callback) {
        var currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
        return db.query("" +
            " update app_application_mall " +
            " set status = ?" +
            " where id = ?", [status, id], callback);
    },
    updateLogo: function (id, url, callback) {
        return db.query("" +
            " update app_application_mall " +
            " set logo_url = ?" +
            " where id = ?", [url, id], callback);
    }
};

module.exports=MallApp;