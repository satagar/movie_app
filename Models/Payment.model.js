const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "BookingData",
        required: true
    },

    status: {
        type: String,
        enum: ["FAILED", "SUCCESS"],
        default: "FAILED"
    },


    amount: {
        type: Number,
        required: true
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
});

module.exports = mongoose.model("PaymentData", paymentSchema);