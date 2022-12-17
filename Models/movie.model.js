const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    releaseDate: {
        type: String,
        required: true
    },

    releaseStatus: {
        type: String,
        enum: ["COMMING_SOON", "RELEASED", "POSTPONED"],
        default: "RELEASED"
    },

    Director: {
        type: String,
        required: true
    },

    Language: {
        type: [String],
        required: true
    },
    poster_URL: {
        type: String,
    },
    casts: {
        type: [String],
        required: true
    },

    Trailer_URL: {
        type: String,
    },

    createdat: {
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

module.exports = mongoose.model("Movie", movieSchema);