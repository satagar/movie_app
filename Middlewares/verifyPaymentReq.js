const Booking = require("../Models/bookingData.model");
var ObjectId = require("mongoose").Types.ObjectId;

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
    if (req.body.amount < booking.totalCost) {
        return res.status(400).send({
            message: "Amount must match total Cost of tickets is Required!"
        })
    }
    next();
}