const Client = require('node-rest-client').Client
const client = new Client()
module.exports = (bookingId,subject,body,recipients,requestor)=>{
    const reqBody = {
        bookingId,
        subject,
        body,
        recipients,
        requestor
    }
    const reqHeaders = {
        "Content-Type":"application/json"
    }
    const args = {
        data:reqBody,
        headers:reqHeaders
    }
    try {
          client.post('http://localhost:5500/notification/service/v1/send',args,(err,data)=>{
            if(err){
                return console.log(err);
            }else{
                console.log(data , 'success')
            }
          })
    }catch(err){
        return console.log(err)
    }
}