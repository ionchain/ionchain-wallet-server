# ionchain-wallet-server
ionchain wallet server

### Send SMS
```
curl -s -X GET \
  http://127.0.0.1:3000/sendSms/18621870243
```
-18621870243 : user's telephone number 

### User Register

```
curl -s -X POST \
  http://127.0.0.1:3000/user \
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

