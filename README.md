# ionchain-wallet-server
ionchain wallet server

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



### User Register

```
curl -s -X POST \
  http://127.0.0.1:3000/user/register \
  -H "content-type: application/json" \
  -d '{
      	"smsCode":"5679",
      	"tel":"18621870243",
      	"password":"123456",
      	"inviteCode":"9527"
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
      	"password":"123456"
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
        "userid": 8,
        "username": "18621870243",
        "tel": "18621870243"
    }
}
```
- code : 0 means success, other representatives fail 
- msg : explanation of code
- userid : user's id
- username : user's name
- tel : user's telephone number

### User update password
```
curl -s -X POST \
  http://127.0.0.1:3000/user/updatePassword \
  -H "content-type: application/json" \
  -d '{
      	"smsCode":"5400",
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

### System Information
```
curl -s -X GET \
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
