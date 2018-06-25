var mysql = require('mysql');

var connection = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'jfinal_cms'
});

module.exports = connection;