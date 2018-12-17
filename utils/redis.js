let redis = require("redis");
let redisClient = redis.createClient({
    "host":"192.168.23.164",
    "port":"6379"
});
module.exports = redisClient;