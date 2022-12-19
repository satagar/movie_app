const mongoose = require('mongoose');

const theatreSchema = mongoose.Schema({
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Movie"
    }
},{timestamps: true});

module.exports = mongoose.model("theatre",theatreSchema);