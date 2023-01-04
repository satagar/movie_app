const Booking = require("../../Models/bookingData.model");
const UserModel = require("../../Models/user.model")
const constant = require("../../Utilis/constant")
exports.createBooking = async(req, res) => {

    var user = await UserModel.findOne({
        userId: req.userId
    });

    const bookingObj = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user._id,
        status: req.body.status,
        Timing: req.body.Timming,
        noOfSeats: req.body.noOfSeats,
        totalCost: (req.body.noOfSeats * constant.ticketPrice)
    }
    try {
        const booking = await Booking.create(bookingObj);
        res.status(201).send(booking)
    } catch (error) {
        return res.status(500).send({
            message: "Error Occured in Creating booking "
        })
    }
}