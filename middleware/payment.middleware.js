const BOOKING = require('../models/booking.model')
const ObjectId = require('mongoose').Types.ObjectId;

exports.validatePaymentBody = async (req,res,next)=>{
    const body = req.body
         if(!body.bookingId){
            return res.status(400).send({
                message:"Booking ID required! Bad request!"
            })
         }
         if(!ObjectId.isValid(body.bookingId)){
            return res.status(400).send({
                message:"Failed! Booking ID is not valid format !"
            })
         }
         try {
               const booking  = await BOOKING.findOne({_id:body.bookingId})
               if(!booking){
                return res.status(404).send({
                    message:"Invalid Booking Id."
                })
               }
               req.body.amount = booking.totalAmount;
               next ()
         }catch(err) {
            console.log(err)
             return res.status(500).send({
                message:"Internal server error"
             })
         }
}