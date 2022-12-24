const theatreModel = require('../models/theatre.model')

exports.validateTheatre = async (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "Please provide a theatre name!"
        })
    }
    if (!req.body.city) {
        res.status(400).send({
            message: "Please provide the city name for theatre search"
        })
    }
    if (!req.body.pincode) {
        res.status(400).send({
            message: "Please provide a valid pincode"
        })
    }
}