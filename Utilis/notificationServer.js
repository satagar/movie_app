const Client = require("node-rest-client").Client
const client = new Client();


exports.sendEmail = (subject, content, emailId, ticketId, requester) => {
    //•sendEmail :-  The method will accept a unique id for the notification object, subject of
    //the mail, mail body, receiver’s mail id and requester mail which in this case is “mba-no-reply@mba.com”.
    var requestBody = {
        subject: subject,
        content: content,
        recepientEmailId: emailId,
        ticketId: ticketId,
        requester: requester
    }

    var args = {
        data: requestBody,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        client.post("http://localhost:3000/notifiServ/api/v1/notifications", args, (data, res) => {
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }

}