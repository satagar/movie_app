const Payment = require('../../Models/Payment.model');
const Booking = require('../../Models/bookingData.model');
const UserModel = require("../../Models/user.model")

exports.findAll = async(req, res) => {

    const user = await UserModel.findOne({ userId: req.userId }).exec();
    if (!user) {
        return res.status(404).send({
            message: "User Not Found"
        })
    }
    let queryObj = {};
    console.log(user)
    if (user.role == "ADMIN") {

    } else {
        const booking = await Booking.find({ _id: user._id }).exec();
        console.log(booking)
        if (!booking) {
            return res.status(404).send({
                message: 'Bookings Not Found'
            })
        }
        const bookingIds = booking.map(b => b._id)
        console.log(bookingIds)
        queryObj._id = { $in: bookingIds };
    }
    try {
        const payments = await Payment.find({ queryObj }).exec();

        res.status(200).send(payments)
    } catch (error) {
        res.status(500).send({
            message: "Error Occured fetching all payments"
        })
    }
}