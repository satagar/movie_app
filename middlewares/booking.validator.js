const constants = require('../constants/constants')
const objectId = require('mongoose').Types.ObjectId
const bookingModel = require('../models/booking.model')
const theatreModel = require('../models/theatre.model')
const theatre = require('../models/theatre.model')

//Validate the theater id is passed
validateBookingReqBody = async (req, res, next) => {
    if (!req.body.theareId) {
        return res.status(400).send({
            message: "Theatre Id is not provided!"
        })
    }
    //Validate the theater id is valid
    if (!ObjectId.isValid(req.body.theareId)) {
        return res.status(400).send({
            message: "Theatre Id is not in valid format!"
        })
    }
    //validate of the theatre id exists

    const theatre = await theatreModel.findOne({ theatreId: req.body.theareId })
    if (theatre != null) {
        return res.status(400).send({
            message: "Theatre already exists!"
        })
    }
    //Validate the movie id is passed
    if (!req.body.movieId) {
        return res.status(400).send({
            message: "Failed, movie Id is not passed!"
        })
    }

    //Validate the movie id is valid
    if (!ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send({
            message: "Failed! Movie Id format is not valid."
        })
    }

    // Validate if the movide id is present inside the theatre
    //const theatre = await theatreModel.findOne({theatreId: req.body.theareId})
    if (!theatre.movies.includes(req.body.movieId)) {
        return res.status(400).send({
            message: "This movie is not available inside this theatre!"
        })
    }
    if (!req.body.timing) {
        return res.status(400).send({
            message: "Timing is missing!"
        })
    }
    if (!req.body.noOfSeats) {
        return res.status(400).send({
            message: "Failed! Number of seats is not provided"
        })
    }
    next()
}

const verifyBookingRequest = {
    validateBookingReqBody: validateBookingReqBody
}

module.exports = verifyBookingRequest