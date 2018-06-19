let pool = require("../utils/query");

/**
 * Find all user
 * @param {string} userId
 * @param {int} limit
 * @param {int} offset
 * @returns {Promise}
 */
exports.findAll = function (userId,limit,offset) {
    return pool.query("SELECT t.id,t.title,t.content,t.image_url as imageUrl,t.create_time as createTime," +
        "t.count_view as viewCount,( SELECT count(id) FROM tb_articlelike WHERE article_id = t.id) AS praiseCount," +
        "t.is_recommend as isRecommend,( IF(( SELECT count(id) FROM tb_articlelike WHERE article_id = t.id AND create_id = ?) > 0 , 1 , 0)) AS isPraise FROM tb_article t LIMIT ?,?",[userId,limit,offset]);
};

/**
 * Find total count
 * @return {Promise}
 */
exports.findCount = function () {
    return pool.query("select count(id) as totalCount from tb_article");
};

/**
 * Find article through id
 * @return {Promise}
 */
exports.findArticleById = function (id) {
    return pool.query("select t.id,t.title,t.content,t.create_time as createTime," +
        "(SELECT realname FROM sys_user where userid = t.create_id) as author from tb_article t where t.id = ?",[id]);
};

/**
 * Increase article view count
 * @param {int} id
 * @returns {Promise}
 */
exports.IncreaseViewCount = function(id){
    return pool.query("update tb_article SET count_view = count_view + 1 where id = ?", id);
};

/**
 * Increase article praise count
 * @param {object} articleLike (we recommend to use jsonObject )
 * @returns {Promise}
 */
exports.IncreasePraiseCount = function(articleLike){
    return pool.query("insert into tb_articlelike SET ?",articleLike);
};


