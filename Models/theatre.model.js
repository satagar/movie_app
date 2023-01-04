const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movie"
    },

    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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

module.exports = mongoose.model("Theatre", theatreSchema)