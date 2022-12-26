const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Theatre",
        required: true
    },

    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movie",
        required: true
    },

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["IN_PROGRESS", "EXPIRED", "SUCCESSFUL"],
        default: "IN_PROGRESS"
    },

    Timing: {
        type: String,
        required: true
    },

    noOfSeats: {
        type: Number,
        required: true
    },

    totalCost: {
        type: Number
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

module.exports = mongoose.model("BookingData", bookingSchema);