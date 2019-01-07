let pool = require("../utils/query");

/**
 * Find users through telephone number
 * @param {string} tel
 * @returns {Promise}
 */
exports.getVersionInfo = function() {
    let sql = "SELECT * FROM app_version_info";
    return pool.query(sql)
};