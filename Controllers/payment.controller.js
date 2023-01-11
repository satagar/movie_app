const Payment= require("../models/payment.model");
const Booking=require("../models/booking.model");

exports.createPayment= async (req,res)=>{

    const booking = await Booking.findOne({ _id: req.body.bookingId });

    var bookingTime = booking.createdAt;
    var currentTime = Date.now();
    var minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60);

    if (minutes > 5) {
        booking.status = constants.bookingStatus.expired;
        await booking.save();
        return res.status(200).send({
        message: "Can't do the payment as the booking is delayed and expired"
        })
    }

    var paymentObject = {
        bookingId: req.body.bookingId,
        amount: req.body.amount,
        status: constants.paymentStatus.success,
    }
    try {
        const payment = await
       Payment.create(paymentObject);
        /**
        * Update the booking status
        */
        booking.status = constants.bookingStatus.completed;
        await booking.save();
        return res.status(201).send(payment);
    } catch (err) {
        console.log(err);
        res.status(500).send({
        message: "Internal error while creating the booking"
        })
    }
       
}

exports.getPaymentById= async (req,res)=>{
    try {
        const payment = await Payment.findOne({_id:req.params.id})
        return res.status(200).send(payment)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            message:"Internal server error"
        })
    }
}

// exports.getAllPayments= async (req,res)=>{
//     const reqData = {}
//     if(req.body.paymentId){
//         reqData.paymentId = req.body.paymentId
//     }

//     try {
//         const payment = await Payment.find(reqData)
//         return  res.status(200).send(payment)

//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).send({
//             message:"Internal server error!"
//         })
        
//     }
// }

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
