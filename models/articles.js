var db = require('../dbconnection');
var uuid = require('node-uuid');
var moment = require('moment');

var Article = {
    getAllArticle: function (num, offset, callback) {
        return db.query("SELECT " +
            " t.id, " +
            " t.folder_id, " +
            " t.title, " +
            " t.count_view, " +
            " t.count_comment, " +
            " t.type, " +
            " t.status, " +
            " t.is_comment, " +
            " t.is_recommend, " +
            " t.sort, " +
            " t.publish_time, " +
            " t.publish_user, " +
            " t.create_id, " +
            " (select count(id) from tb_articlelike tt where tt.article_id = t.id) as count_like, " +
            " t.content " +
            "FROM " +
            " tb_article t " +
            "WHERE " +
            " t. STATUS = '1' " +
            " ORDER BY " +
            " t.sort, " +
            " t.id" +
            " limit ? offset ?", [num, offset], callback);
    },
    getArticleById: function (id, callback) {
        return db.query("SELECT " +
            " t.id, " +
            " t.folder_id, " +
            " t.title, " +
            " t.count_view, " +
            " t.count_comment, " +
            " t.type, " +
            " t.status, " +
            " t.is_comment, " +
            " t.is_recommend, " +
            " t.sort, " +
            " t.publish_time, " +
            " t.publish_user, " +
            " t.create_id, " +
            " (select count(id) from tb_articlelike tt where tt.article_id = t.id) as count_like, " +
            " t.content " +
                "FROM " +
                    " tb_article t " +
                        "WHERE " +
                            " t. id = ? " +
                        " ORDER BY " +
                            " t.sort, " +
                            " t.id" +
                        " limit 1", [id], callback);
    }
}

module.exports=Article;