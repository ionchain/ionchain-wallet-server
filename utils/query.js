let connection = require("../dbconnection");
/**
 * A function for mysql database operation
 * @param {string} sql
 * @param {array|object} values (you can use jsonObject when inserting)
 * @returns {Promise}
 */
exports.query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        connection.getConnection(function(err, conn) {
            if (err) {
                reject( err );
            } else {
                conn.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( rows );
                    }
                    conn.release();
                })
            }
        })
    })
};