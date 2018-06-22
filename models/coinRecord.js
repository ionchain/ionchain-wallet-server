let pool = require("../utils/query");

/**
 * Save coin detail
 * @param {object} coinDetail (we recommend to use jsonObject)
 * @returns {Promise}
 */
exports.save = function(coinDetail){
    return pool.query("insert into tb_coin_record SET ?", coinDetail);
};

/**
 * Find coin details through userId
 * @param userId
 * @param limit
 * @param offset
 * @return {Promise}
 */
exports.findByUserId = function (userId,limit,offset) {
    return pool.query("SELECT userid as userId,create_time as createTime,type,amount FROM tb_coin_record WHERE userid = ? limit ?,?",[userId,limit,offset]);
};

/**
 * Find total count
 * @param {int} userId
 * @return {Promise}
 */
exports.findCountByUserId = function (userId) {
    return pool.query("select count(id) as totalCount from tb_coin_record WHERE userid = ?",[userId]);
};


