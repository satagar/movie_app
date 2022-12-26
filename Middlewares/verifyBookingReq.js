const Theatre = require("../Models/theatre.model");
var ObjectId = require("mongoose").Types.ObjectId;

exports.verifyBooking = async(req, res, next) => {

    if (!req.body.theatreId) {
        return res.status(400).send({
            message: "Theatre Id is Required"
        })
    }

    if (!ObjectId.isValid(req.body.theatreId)) {
        return res.status(400).send({
            message: "Invalid Theatre Id Format"
        })
    }

    if (!req.body.movieId) {
        return res.status(400).send({
            message: "Movie Id is Required"
        })
    }

    if (!ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send({
            message: "Invalid Movie Id Format"
        })
    }

    if (!req.body.Timming) {
        return res.status(400).send({
            message: "Timming is Required"
        })
    }

    if (!req.body.totalCost) {
        return res.status(400).send({
            message: "totalCost is Required"
        })
    }

    if (!req.body.noOfSeats) {
        return res.status(400).send({
            message: "noOfSeats is Required"
        })
    }

    var theatre = await Theatre.findOne({
        _id: req.params.theatreId
    })

    if (!theatre) {
        return res.status(404).send({
            message: "theatre Not found"
        })
    }
    if (!theatre.movies.includes(req.body.movieId)) {
        return res.status(400).send({
            message: "Movie is unavailable at the moment"
        })
    }

    next();
}