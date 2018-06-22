let redis = require("../utils/redis");
let userMapper = require("../models/user");
const DEFAULT_LENGTH = 6;

/**
 * 生成随机邀请码
 * @param randomFlag
 * @param min
 * @param max
 * @return {string}
 */
function randomWord(randomFlag, min, max){
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(let i = 0; i < range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

/**
 * 加载数据库邀请码数据
 * @return {Promise.<void>}
 */
exports.loadInviteCodes = async function () {
    let inviteCodes = await userMapper.findInviteCodes();
    for(let i = 0 ; i < inviteCodes.length ; i ++){
        if(!inviteCodes[i].inviteCode){
            continue;
        }
        redis.set(inviteCodes[i].inviteCode,inviteCodes[i].inviteCode);
    }
};

/**
 * 创建非重邀请码
 * @return {Promise}
 */
exports.createInviteCode = function () {
    return new Promise(( resolve, reject ) => {
        let inviteCode = randomWord(false, DEFAULT_LENGTH);
        redis.get(inviteCode, function (error, result) {
            if(error){
                return reject(error);
            }
            if (result) {
                return this.createInviteCode();
            }else{
                resolve(inviteCode);
            }
        });
    });
};