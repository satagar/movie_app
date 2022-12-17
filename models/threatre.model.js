const mongoose = require('mongoose');

const threatreSchema = mongoose.Schema({
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
    }
},{timestamps: true});

module.exports = mongoose.model("Threatre",threatreSchema);