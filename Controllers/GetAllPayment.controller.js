const Payment = require('../Models/Payment.model');
const Booking = require('../Models/bookingData.model');
const UserModel = require("../Models/user.model")

exports.findAll = async(req, res) => {

    const user = await UserModel.findOne({ userId: req.userId }).exec();
    if (!user) {
        return res.status(404).send({
            message: "User Not Found"
        })
    }
    let queryObj = {};
    if (user.role != "ADMIN") {
        const booking = await Booking.find({ user }).exec();

        if (!booking) {
            return res.status(404).send({
                message: 'Bookings Not Found'
            })
        }

        queryObj._id = booking._id;
        try {
            const payments = await Payment.find({ queryObj }).exec();

            res.status(200).send(payments)
        } catch (error) {
            res.status(500).send({
                message: "Error Occured fetching all payments"
            })
        }
    }
}