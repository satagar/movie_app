const Booking = require("../Models/bookingData.model");
const UserModel = require("../Models/user.model")
const constant = require("../Utilis/constant")
exports.createBooking = async(req, res) => {

    const user = await UserModel.findOne({
        userId: req.userId
    });

    const bookingResp = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user.userId,
        Timming: req.body.Timming,
        noOfSeats: req.body.noOfSeats,
        totalCost: (noOfSeats * constant.ticketPrice)
    }
    try {
        const booking = await Booking.create(bookingResp);
        res.status(201).send(booking)
    } catch (error) {
        return res.status(500).send({
            message: "Error Occured in Creating booking "
        })
    }
}