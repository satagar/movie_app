const mongoose = require('mongoose')
const appConstant = require('../constants/app.constants')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ReleaseDate: {
        type: Date,
        required: true,
        immutable: true
    },
    releaseStatus: {
        type: Date,
        required: true,
        default: 'RELEASED'
    },
    director: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: 'Hindi'
    },
    posterURL: {
        type: String,
        URL: ''
    },
    trailorURL: {
        type: String,
        URL: ''
    },
    cast: {
        type: String,
        required: true
    }
})

module.exports = mongoose.Model('movieModel', movieSchema)