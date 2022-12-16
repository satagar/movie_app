const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    releaseDate: {
        type: Date,
        required: true
    },
    releaseStatus: {
        type: String,
        enum: ["RELEASED", "UNRELEASED", "BLOCKED"],
    },
    director: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "Hindi"
    },
    posterUrl: {
        type: String,
    },
    casts: {
        type: [String],
    },
    trailerUrl: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("Movie", movieSchema);