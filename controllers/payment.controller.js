const PAYMENT = require('../models/payment.model');
const BOOKING = require('../models/booking.model')
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
        console.log(minutes /60 , currentTime , booking.createAt)
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
        return res.status(201).send({
            Booking_Status : booking.status,
            Payment_Summary : payment
        });
    }catch( err ){
        return res.status(500).send({
            message: "Internal server error! "
        })
    }
}