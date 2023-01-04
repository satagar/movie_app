const Payment = require("../../Models/Payment.model")

exports.getPaymentOnId = async(req, res) => {
    try {
        const payments = await Payment.findOne({ _id: req.params.id });
        if (!payments) {
            return res.status(404).send({
                message: "Payments Not Found"
            })
        }
        res.status(200).send(payments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error Occured in fetching payments By Id"
        })
    }

}