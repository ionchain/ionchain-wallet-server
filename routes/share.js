let express = require("express");
let router = express.Router();
let userMapper = require("../models/user");
/**
 * Goto share rules page
 */
router.get("/share/rule", function (req,res) {
    return res.render('share/rule',{});
});

/**
 * Goto share main page
 * @param {int} id
 */
router.get("/share/:inviteCode",async function (req,res) {
    let inviteCode = req.params.inviteCode;
    if(!inviteCode) {
        return res.render('404', {msg: '邀请码不能为空!'});
    }
    try {
        let user = await userMapper.findByInviteCode(inviteCode);
        console.log(user[0]);
        if(!user || user.length === 0){
            return res.render('404', {msg: '邀请码不存在!'});
        }else{
            return res.render('share/index',{"inviteCode":inviteCode,"userId":user[0].userid});
        }
    }catch(e) {
        return res.render("404",{msg:"服务器内部错误!"})
    }
});

/**
 * Goto share detail page
 */
router.get("/share/detail/:inviteCode/:userId",async function (req,res) {
    return res.render('share/detail',{"inviteCode":req.params.inviteCode,"userId":req.params.userId});
});

module.exports = router;