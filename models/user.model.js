const mongoose = require('mongoose')
// const bookingModel = require('../models/booking.model')
// const constants = require('../constants/constants')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isValidEmail: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: () => { return Date.now() }
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => { return Date.now() }
    },
    userType: {
        type: String,
        required: true,
        default: "customer"
    },
    userStatus: {
        type: String,
        required: true,
        default: "approved"
    },
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "bookingModel"
    }
})

module.exports = mongoose.model('userModel', userSchema)