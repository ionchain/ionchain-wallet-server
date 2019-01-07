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



exports.updateVersionInfo = function (id, version) {
    let sql = "update app_version_info " +
        "   set has_new_version = ?,must_update = ?,version_number = ?,version_code = ?,update_info = ?, url = ? " +
        "   where id = ?";
    return pool.query(sql,[version.has_new_version,version.must_update,version.version_number,version.version_code,version.update_info,version.url,id])
};