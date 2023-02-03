const Payment = require("../../Models/Payment.model");
const Booking = require("../../Models/bookingData.model");
const UserModel = require("../../Models/user.model");
const { sendEmail } = require("../../Utilis/notificationServer")


exports.creatingPayment = async(req, res) => {
    const booking = await Booking.findOne({ _id: req.body.bookingId });

    var bookingTime = booking.createdAt;
    var presentTime = Date.now();

    var minTimeToConfirm = Math.floor(((presentTime - bookingTime) / 1000) / 60); // timeStamp is in ms (1000/60) used to convert in mins

    if (minTimeToConfirm > 5) {
        booking.status = "EXPIRED";
        await booking.save();
        return res.status(200).send({
            message: "Payment Time Expired Please try again after sometime"
        })
    }

    var paymentObj = {
        bookingId: req.body.bookingId,
        amount: req.body.amount,
        status: "SUCCESS"
    }

    try {
        const payment = await Payment.create(paymentObj);
        booking.status = "COMPLETED";
        await booking.save();

        const user = await UserModel.findOne({ userId: req.userId });
        sendEmail(payment._id, `Successful Payment for BookingId: ${booking._id}`, user.emailId, "pranit_movie_app@gmail.com");

        res.status(201).send(payment);



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occured in Payment Creation"
        })
    }

}