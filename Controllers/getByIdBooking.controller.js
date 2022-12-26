const Booking = require("../Models/bookingData.model");

exports.findById = async(req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id
        })

        if (!booking) {
            return res.status(404).send({
                message: "Booking not Found"
            })
        }

        res.status(200).send(booking);
    } catch (error) {
        return res.status(500).send({
            message: "Error Occurred in finding bookings"
        })
    }
}