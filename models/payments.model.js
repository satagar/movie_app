const mongoose = require('mongoose')
const paymentStatus = require('../constants/constants')
const bookingId = require('../models/booking.model')


const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'bookingModel'
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        default: 'FAILED'
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    }
})

module.exports = mongoose.model('paymentModel', paymentSchema)