const Payment = require("../Models/Payment.model");
const Booking = require("../Models/bookingData.model");

exports.creatingPayment = async(req, res) => {
    const booking = await Booking.findOne({ _id: req.body.bookingId });

    var bookingTime = booking.createdAt;
    var presentTime = Date.now();

    var Diff = Math.floor(((presentTime - bookingTime) / 1000) / 60);

    if (Diff > 5) {
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
        booking.status = "SUCCESSFUL";
        await booking.save();

        res.status(201).send(payment);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occured in Payment Creation"
        })
    }

}