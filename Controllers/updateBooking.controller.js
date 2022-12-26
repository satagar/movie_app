const Booking = require("../Models/bookingData.model");
const constant = require("../Utilis/constant")

exports.updateBooking = async(req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id
        })

        booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
        booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
        booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId;
        booking.status = req.body.status != undefined ? req.body.status : booking.status;
        booking.Timing = req.body.Timing != undefined ? req.body.Timing : booking.Timing;
        booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
        booking.totalCost = booking.noOfSeats * constant.ticketPrice;

        const updatedBookingData = await booking.save();
        res.status(201).send(updatedBookingData);
    } catch (error) {
        return res.status(500).send({
            message: "Error Occurred in Updation"
        })
    }
}