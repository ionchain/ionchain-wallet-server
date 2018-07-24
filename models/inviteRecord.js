let pool = require("../utils/query");

/**
 * Save user invite detail
 * @param {object} userInvite (we recommend to use jsonObject )
 * @returns {Promise}
 */
exports.save = function(userInvite){
    return pool.query("insert into tb_invite_record SET ?", userInvite);
};

/**
 * Find user invite details through inviteCode
 * @param {string} inviteCode
 * @param {int} limit
 * @param {int} offset
 * @return {Promise}
 */
exports.findByInviteCode = function (inviteCode,limit,offset) {
    return pool.query("SELECT (SELECT tel FROM sys_user WHERE userid = t.userid)as tel,t.create_time as createTime FROM tb_invite_record t WHERE t.invitecode = ? limit ?,?",[inviteCode,limit,offset]);
};

/**
 * Find total count through inviteCode
 * @param {string} inviteCode
 * @return {Promise}
 */
exports.findCountByInviteCode = function (inviteCode) {
    return pool.query("select count(id) as totalCount from tb_invite_record WHERE invitecode = ? ",[inviteCode]);
};

/**
 * Find inviting rating
 * @param {int} limit
 * @param {int} offset
 * @returns {Promise}
 */
exports.findAll = function (limit,offset) {
    return pool.query("SELECT (SELECT tel from sys_user where invite_code = a.invitecode) as tel,count(*) * 80 as amount FROM tb_invite_record a " +
        "GROUP BY a.invitecode ORDER BY amount desc LIMIT ?,?",[limit,offset]);
};

/**
 * Find total inviteCode count
 * @return {Promise}
 */
exports.findCount = function(){
    return pool.query("SELECT COUNT(distinct invitecode) as totalCount FROM tb_invite_record");
};

