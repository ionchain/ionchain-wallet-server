let pool = require("../utils/query");

/**
 * Find users through telephone number
 * @param {string} tel
 * @returns {Promise}
 */
exports.findByTel = function(tel) {
    let sql = "SELECT * FROM sys_user where tel = ?";
    return pool.query(sql,[tel])
};

/**
 * Find users through inviteCode
 * @param {string} inviteCode
 * @returns {Promise}
 */
exports.findByInviteCode = function(inviteCode) {
    let sql = "SELECT * FROM sys_user where invite_code = ?";
    return pool.query(sql,[inviteCode])
};

/**
 * Find users through userId
 * @param {string} userId
 * @returns {Promise}
 */
exports.findById = function(userId) {
    let sql = "SELECT * FROM sys_user where userid = ?";
    return pool.query(sql,[userId])
};

/**
 * Find user through telephone and password
 * @param{string} tel
 * @param{string} password
 * @returns {Promise}
 */
exports.findByTelAndPassword = function(tel,password) {
    let sql = "SELECT userid as userId,username as userName,tel,invite_code as inviteCode,coin FROM sys_user where tel = ? and password = ?";
    return pool.query(sql,[tel,password]);
};

/**
 * Find all user
 * @returns {Promise}
 */
exports.findAll = function () {
    return pool.query("select * from sys_user");
};

/**
 * Save user information
 * @param {object} user (we recommend to use jsonObject )
 * @returns {Promise}
 */
exports.save = function(user){
    return pool.query("insert into sys_user SET ?", user);
};

/**
 * Update user's password
 * @param {string} id
 * @param {string} newpassword
 * @return {Promise}
 */
exports.updatePassword = function(id,newpassword){
    return pool.query("update sys_user set password = ? where userid = ?",[newpassword,id]);
};

/**
 * Update user's coin
 * @param {string} id
 * @param {int} amount
 * @return {Promise}
 */
exports.updateIonCoin = function(id,amount){
    return pool.query("update sys_user set coin = coin + ? where userid = ?",[amount,id]);
};

/**
 * Find all inviteCode
 * @return {Promise}
 */
exports.findInviteCodes = function(){
    return pool.query("SELECT invite_code as inviteCode FROM sys_user");
}

