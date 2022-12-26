const mongoose = require('mongoose')
const appConstant = require('../constants/app.constants')

const movieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
        immutable: true,
        default: () => {
            return Date.now()
        }
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
    trailerURL: {
        type: String,
        URL: ''
    },
    cast: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => {
            return Date.now()
        }
    }
})

module.exports = mongoose.model('movieModel', movieSchema)