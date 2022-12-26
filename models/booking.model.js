const userId = require("./user.model")
const movieId = require('./movies.model')
const theatreId = require('./theatre.model')
const { default: mongoose } = require("mongoose")

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true,
        ref: "movieModel"
    },
    theatreId: {
        type: String,
        required: true,
        ref: "theatreModel"
    },
    userId: {
        type: String,
        required: true,
        ref: "userModel"
    },
    timing: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        required: true,
        defualt: "IN-PROGRESS"
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => {
            return Date.now()
        }
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('bookingModel', bookingSchema)