var db = require('../dbconnection');

var Screen = {
    batchInsert: function(values, callback) {
        var data = db.query("" +
            "insert into " +
                "app_screenshot" +
                    "(id, url, name, sys_name, size, create_time, update_time,status,app_mall_id) " +
                        "values ?",
                    [
                        values
                    ],
            callback);
        console.info(data);
        return data;
    }
};

module.exports=Screen;