# ionchain-wallet-server
ionchain wallet server

## Modules
- [Tools](#tools)
- [User](#user)
- [System](#system)
- [Article](#article)
- [InviteRecord](#inviterecord)
- [CoinRecord](#coinrecord)
- [VersionInfo](#versioninfo)


## Tools
### Send SMS
```
curl -s -X POST \
  http://127.0.0.1:3000/sendSms \
  -H "content-type: application/json" \
  -d '{
        "tel":"18621870243"
     }'
```
- tel : user's telephone number 

##### Response:
```
{
    "code": 0,
    "msg": "操作成功!"
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code


## User
### User Register

```
curl -s -X POST \
  http://127.0.0.1:3000/user/register \
  -H "content-type: application/json" \
  -d '{
      	"smsCode":"6923",
      	"tel":"18621870243",
      	"password":"123456782A1a",
      	"inviteCode":"B8IMLH"
      }'
```
- smsCode : short message code
- tel：user's telephone number
- password：user's password 
- inviteCode: user's inviteCode

##### Response:
```
{
    "code": 0,
    "msg": "操作成功!"
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code

### User login
```
curl -s -X POST \
  http://127.0.0.1:3000/user/login \
  -H "content-type: application/json" \
  -d '{
      	"tel":"18621870243",
      	"password":"123456782A1a"
      }'
```
- tel：user's telephone number
- password：user's password 

##### Response:
```
{
    "code": 0,
    "msg": "操作成功!",
    "data": {
        "userId": 22,
        "userName": "18673692416",
        "tel": "18673692416",
        "inviteCode": "B8IMLH",
        "coin": 130
    }
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code
- userId : user's id
- userName : user's name
- tel : user's telephone number
- inviteCode : user's inviteCode
- coin : the number of user's coin

### User update password
```
curl -s -X POST \
  http://127.0.0.1:3000/user/updatePassword \
  -H "content-type: application/json" \
  -d '{
      	"smsCode":"8869",
      	"tel":"18621870243",
      	"newpassword":"123456AaB"
      }'
```
- smsCode : short message code
- tel：user's telephone number
- newpassword：user's new password 

###### Response:
```
{
    "code": 0,
    "msg": "操作成功!"
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code

## System
### System Information
```
curl -s -X POST \
  http://127.0.0.1:3000/sys/info 
```
##### Response:
```
{
    "code": 0,
    "msg": "操作成功!",
    "data": {
        "contractAddress": "0x92e831bbbb22424e0f22eebb8beb126366fa07ce",
        "providerUrl": "https://ropsten.infura.io"
    }
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code
- contractAddress : contract's address
- providerUrl : blockchain service provider

## Article
### Find Articles
```
curl -s -X POST \
  http://127.0.0.1:3000/article/findAll \
  -H "content-type: application/json" \
  -d '{
      	"userId":1,
      	"pageNo":1,
      	"pageSize":2
      }'
```
- userId: we use userId to judge if the user has praised this article
- pageNo: paging param
- pageSize: paging param
##### Response:
```
{
    "code": 0,
    "msg": "操作成功!",
    "data": [
        {
            "id": 1,
            "title": "门头沟",
            "content": "<p>门头沟</p>",
            "imageUrl": "download/image_url/20150529_102007_298104.jpg",
            "createTime": "2015-01-28",
            "viewCount": 124,
            "praiseCount": 4,
            "isRecommend": 1,
            "isPraise": 0,
            "url": "http://127.0.0.1:3000/article/1"
        },
        {
            "id": 105,
            "title": "北京门头沟：持京卡10元游京西“三山一湖”",
            "content": "<p align=\"center\" style=\"margin-top: 0px; margin-bottom: 0px; padding: 5px 25px; font-family: 宋体; color: rgb(0, 0, 0); font-size: 14px; line-height: 28px; white-space: normal;\"><img border=\"0\" src=\"http://acftu.workercn.cn/html/files/2015-04/30/20150430161629353296461.jpg\"/></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 5px 25px; font-family: 宋体; color: rgb(0, 0, 0); font-size: 14px; line-height: 28px; text-align: justify; white-space: normal;\">　　中工网讯 近日，由北京市门头沟区总工会、区旅游委和灵山、百花山、妙峰山、珍珠湖景区合作主办的“走进门头沟——十元游京西山水启动仪式”在妙峰山景区举行。区总工会常务副主席杜军、区旅游委主任刘贵清、区总工会副主席郭燕等领导出席启动仪式，启动仪式上职工服务中心负责人与景区代表负责人签署了合作协议。</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 5px 25px; font-family: 宋体; color: rgb(0, 0, 0); font-size: 14px; line-height: 28px; text-align: justify; white-space: normal;\">　　10元就可以游京西灵山、百花山、妙峰山、珍珠湖。这是门头沟区总工会为本区工会会员提供的一项优惠活动。据介绍，此项活动开展时间为5月1日至10月7日。活动期间凭本区“京卡·互助服务卡”和预定门票不仅能够以最优惠的价格享受游览“三山一湖”的优质服务，更能够远离雾霾尽享门头沟区秀美风光。</p><p><br/></p>",
            "imageUrl": null,
            "createTime": "2015-01-28",
            "viewCount": 21,
            "praiseCount": 1,
            "isRecommend": 2,
            "isPraise": 1,
            "url": "http://127.0.0.1:3000/article/1"
        }
    ],
    "ext": {
        "totalCount": 186
    }
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code
- id : article's id
- title : article's title
- content : article's content
- imageUrl : article's cover image
- createTime : article's createTime
- viewCount : the number of article view
- praiseCount : the number of article praise
- isRecommend : whether article is recommended
- isPraise : whether article is praised
- totalCount : total number of articles
- url : article detail page's request url




### Find Article Details
```
curl -s -X POST \
  http://127.0.0.1:3000/article/detail \
  -H "content-type: application/json" \
  -d '{
      	"articleId":1
      }'
```
- articleId : article'Id
##### Response:
```
{
    "code": 0,
    "msg": "操作成功!",
    "data": {
        "id": 1,
        "title": "门头沟",
        "content": "<p>门头沟</p>",
        "createTime": "2015-01-28",
        "author": "系统管理员"
    }
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code
- id : article's id
- title : article's title
- content : article's content
- createTime : article's createTime
- author : article's author

### View Article
```
curl -s -X POST \
  http://127.0.0.1:3000/article/view \
  -H "content-type: application/json" \
  -d '{
      	"articleId":1
      }'
```
- articleId : article's Id
##### Response:
```
{
    "code": 0,
    "msg": "操作成功!"
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code

### Praise Article
```
curl -s -X POST \
  http://127.0.0.1:3000/article/praise \
  -H "content-type: application/json" \
  -d '{
      	"articleId":1,
      	"userId":1
      }'
```
- articleId : article's Id
##### Response:
```
{
    "code": 0,
    "msg": "操作成功!"
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code

## InviteRecord
### Find User's Invite Records
```
curl -s -X POST \
  http://127.0.0.1:3000/inviteRecord/findAll \
  -H "content-type: application/json" \
  -d '{
        "inviteCode":"B8IMLH"
      }'
```
- inviteCode : user's inviteCode
##### Response:
 ```
{
    "code": 0,
    "msg": "操作成功!",
    "data": [
        {
            "tel": "18621870243",
            "createTime": "2018-06-22 10:04:17"
        }
    ],
    "ext": {
        "totalCount": 1
    }
}
 ```
- code : 0 means success, other representatives fail 
- msg : explanation of code
- tel：user's telephone number
- createTime : record's createTime
- totalCount : total number of invite records


## CoinRecord
### Find coin's Records
```
curl -s -X POST \
  http://127.0.0.1:3000/coinRecord/findAll \
  -H "content-type: application/json" \
  -d '{
         "userId":23
      }'
```
- userId : user's Id
##### Response:
 ```
{
    "code": 0,
    "msg": "操作成功!",
    "data": [
        {
            "userId": 23,
            "createTime": "2018-06-22 10:04:17",
            "type": 1,
            "amount": "30"
        }
    ],
    "ext": {
        "totalCount": 1
    }
}
 ```
- code : 0 means success, other representatives fail
- msg : explanation of code
- userId : user's Id
- createTime : record's createTime
- type : 1 means register,2 means invite user ,3 means sign
- amount : amount

## VersionInfo
### get wallet's versioninfo
```
curl -s -X POST \
  http://127.0.0.1:3000/version \
  -H "content-type: application/json"
```
##### Response:
 ```
{
    "code": 0,
    "msg": "操作成功!",
    "data": [
        {
            "id": "1",
            "has_new_version": "1",
            "must_update": "1",
            "version_number": "102",
            "version_code": 1,
            "update_info": "Version:v_1.0.0-alpha&&Content:&&1.Added according to the system language Settings to switch between Chinese and English. &&2.Optimizes the prompts given to users when they are not connected to the main network. &&3.New version information, automatic update and manual update function in App. Item n add IONC and RMB value relationship.&&",
            "url": "http://www.blockchainbrother.com/css/default/app-ionchain-release.apk",
            "language": "1",
            "ionc_node": "xxx-test"
        },
        {
            "id": "1a1f18d6faf0fasdfas",
            "has_new_version": "1",
            "must_update": "0",
            "version_number": "1.0.2",
            "version_code": 104,
            "update_info": "最新版本:v_1.0.0-alpha&&更新内容:&&1.新增根据系统的语言设置切换中英文。 &&2.优化连接不上主网的时候给用户的提示。&&3.新增版本信息，自动更新和App里手动更新的功能。&&4.新增IONC和RMB价值关系&",
            "url": "http://www.blockchainbrother.com/css/default/app-ionchain-release.apk",
            "language": "0",
            "ionc_node": "555555555555555555"
        }
    ]
}
 ```
- code : 0 means success, other representatives fail
- msg : explanation of code
- has_new_version : has_new_version
- must_update: 1 yes; 0 no;
- version_number : version number
- version_code : version code
- update_info : update_info
- url : download url
- language : 1:English; 0 :Chinese;
- ionc_node : http:xxx.xxx.xxx:8545;
- amount : amount
 
 