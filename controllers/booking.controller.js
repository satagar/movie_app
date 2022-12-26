const bookingModel = require('../models/booking.model')
const constants = require('../constants/constants')
const userModel = require('../models/user.model')


//Getting TypeError in getAllBookings api for userType property
exports.getAllBookings = async (req, res) => {
    const user = await userModel.findOne({ userId: req.params.userId })
    const foundBookings = {}
    if (user.userType == constants.userType.admin && req.query.bookingId != undefined) {
        foundBookings.bookingId = req.query.bookingId
    } elseif(user.userType == constants.userType.customer && req.query.bookingId != undefined)
    foundBookings.bookingId = user.bookingId
    res.status(200).send(foundBookings)
}

exports.getBookingById = async (req, res) => {
    try {
        const bookingId = await bookingModel.findOne({ bookingId: req.params.bookingId })
        res.status(200).send(bookingId)
    } catch (err) {
        res.status(400).send(err)
    }

}

exports.createBooking = async (req, res) => {
    const user = await userModel.findOne({ userId: req.params.userId })
    const newBooking = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: req.body.userId,
        timing: req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost: (req.body.noOfSeats * constants.ticketPrice)
    }
    try {
        const bookingDone = await bookingModel.create(newBooking)
        res.status(201).send(bookingDone)
    } catch (err) {
        res.status(500).send({
            Message: " Internal error occured while creating new booking, try again!"
        })
    }
}

exports.updateBooking = async (req, res) => {
    const existingBooking = await bookingModel.findOne({ bookingId: req.params.bookingId })

    if (!existingBooking) {
        res.status(400).send({ message: "Booking Id not found!" })
    }
    if (req.body.theatreId != undefined) {
        existingBooking.theatreId = req.body.theatreId
    } else {
        existingBooking.theatreId = existingBooking.theatreId
    }
    if (req.body.movieId != undefined) {
        existingBooking.movieId = req.body.movieId
    } else {
        existingBooking.movieId = existingBooking.movieId
    }
    if (req.body.userId != undefined) {
        existingBooking.userId = req.body.userId
    } else {
        existingBooking.userId = existingBooking.userId
    }
    if (req.body.timing != undefined) {
        existingBooking.timing = req.body.timing
    } else {
        existingBooking.timing = existingBooking.timing
    }
    if (req.body.noOfSeats != undefined) {
        existingBooking.noOfSeats = req.body.noOfSeats
    } else {
        existingBooking.noOfSeats = existingBooking.noOfSeats
    }
    if (req.body.totalCost != undefined) {
        existingBooking.totalCost = req.body.totalCost
    } else {
        existingBooking.totalCost = existingBooking.totalCost
    }
    if (req.body.bookingStatus != undefined && req.body.bookingStatus == inProgress | completed | cancelled | expired) {
        existingBooking.bookingStatus = req.body.bookingStatus
    } else {
        existingBooking.bookingStatus = existingBooking.bookingStatus
    }
    try {
        const updatedBooking = await existingBooking.save()
        res.status(201).send(updatedBooking)
    } catch (error) {
        res.status(500).send({
            message: "Internal Error occured while updating booking!"
        })
    }
}
