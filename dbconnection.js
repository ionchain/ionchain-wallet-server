var mysql = require('mysql');

var connection = mysql.createPool({
    host:'192.168.31.182',
    user:'root',
    password:'root',
    database:'jfinal_cms'
});

module.exports = connection;