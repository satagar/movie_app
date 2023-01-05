const constants = require('../constants/constants')
const ObjectId = require('mongoose').Types.ObjectId
const bookingModel = require('../models/booking.model')

const validatePaymentBodyRequest = async (req, res, next) => {
    const booking = await bookingModel.findOne({ bookingId: req.body.bookingId })
    //Validate the booking id is passed
    if (!req.body.bookingId) {
        return res.status(400).send({
            message: "Failed! Booking Id is not provided!"
        })
    }
    //Validate the booking id is valid
    if (!ObjectId.isValid(req.body.bookingId)) {
        return res.status(400).send({
            message: "Failed! Provided booking Id is not valid!"
        })
    }
    //Validte if the booking exists
    if (!booking == null) {
        return res.status(400).send({
            message: "Failed! Booking Id provided doesn't exist!"
        })
    }
    //Check for the amount
    if (req.body.amount < booking.totalCost) {
        return res.status(400).send({
            message: "Amount is less than Total Cost!"
        })
    }
    next()
}

const verifyPaymentRequest = {
    validatePaymentBodyRequest: validatePaymentBodyRequest
}

module.exports = verifyPaymentRequest