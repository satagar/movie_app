const PAYMENT = require('../models/payment.model');
const BOOKING = require('../models/booking.model')
const USER = require('../models/user.model')
const sendEmail = require('../utils/notificationClient')
exports.createPayment = async (req, res) => {
    const reqData = {
        bookingId: req.body.bookingId,
        amount: req.body.amount,
    }
    try {
        const booking = await BOOKING.findOne({
            _id: req.body.bookingId
        });
        const currentTime = Date.now()
        const minutes = Math.floor(((currentTime - parseInt(booking.createAt)) /1000)/ 60);
        if (minutes > 5) {
            booking.status = 'EXPIRED';
            await booking.save();
            return res.status(200).send({
                message: "Can't do the payment as the booking is delayed and expired "
            })
        }
        reqData.status = 'SUCCESS';
        const payment = await PAYMENT.create(reqData)
           booking.status = 'COMPLETED'
           await booking.save()
           const user = await USER.findOne({_id:booking.userId})
          /*
                 send notification for complete the payment by users
          */
          sendEmail(payment._id,`payment successfully for the booking ID : ${booking._id}`,`${JSON.stringify(booking)}`,user.email,'movie-app@gmail.com')
        return res.status(201).send({
            message:"Payment successfully.",
            Booking_Status : booking.status,
            Payment_Summary : payment
        });
    }catch( err ){
        return res.status(500).send({
            message: "Internal server error! "
        })
    }
}

exports.getAllpayments  = async (req,res) => {
     const reqData = {};
     try {
           const user = await USER.findOne({userId:req.userId});
           if(user.userType!='ADMIN'){
               reqData.userId = user._id
               reqData.status = 'COMPLETED'
           }
           const booking = await BOOKING.find(reqData);
           const bookingIds = booking.map(b => b._id);
           const payment = await PAYMENT.find({bookingId:{ $in: bookingIds }})
           return res.status(200).send(payment);
     }catch( err ){
        return res.status(500).send({
            message: "Internal server error! "
        })
    }
}
exports.getPaymentById  = async (req,res) => {
    try {
          const payment = await PAYMENT.findOne({_id:req.params.id});
          if(!payment){
            return res.status(404).send({
                message:"Payment ID does not exists."
            })
          }
          return res.status(200).send(payment);
    }catch( err ){
       return res.status(500).send({
           message: "Internal server error! "
       })
   }
}