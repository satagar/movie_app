const Booking = require("../Models/bookingData.model");
const UserModel = require("../Models/user.model");

exports.getAllBookings = async(req, res) => {
    try {
        const user = await UserModel.findOne({
            userId: req.userId
        })

        if (!user) {
            return res.status(404).send({
                message: "User Not found"
            })
        }

        let queryObj = {};
        if (!user.role == "ADMIN") {

            queryObj._id = user._id;
        }
        const bookings = await Booking.find(queryObj);
        res.status(200).send(bookings)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error in Finding Bookings"
        })
    }


}