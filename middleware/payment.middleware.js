const Booking = require("../models/booking.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.verifyPayment = async(req, res, next) => {
    if (!req.body.bookingId) {
        return res.status(400).send({
            message: "Booking Id is Required!"
        })
    }

    if (!ObjectId.isValid(req.body.bookingId)) {
        return res.status(400).send({
            message: "Valid Booking Id Format is Required!"
        })
    }

    const booking = await Booking.findOne({ _id: req.body.bookingId });

    if (!booking) {
        return res.status(404).send({
            message: "Booking deatils Not Found"
        })
    }
    next();
}