// const userId = require("./user.model")
// const movieId = require('./movies.model')
// const theatreId = require('./theatre.model')
const { default: mongoose } = require("mongoose")
//const bookingStatus = require('../constants/constants')

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "movieModel"
    },
    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "theatreModel"
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
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