const mongoose = require('mongoose');

const sts = ["RELEASED", "UNRELEASED", "BLOCKED"]

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    description : {
        type : String,
        required : true
    },
    casts : {
        type : [String],
        required : true
    },
    releaseDate : {
        type : String,
        required : true
    },
    releaseStatus : {
        type : String,
        required : true,
        enum : sts
    },
    director : {
        type : String,
        required : true
    },
    language : {
        type : String,
        required : true,
        default : 'Hindi'
    },
    posterUrl : {
        type : String
    },
    trailerUrl : {
        type : String
    },
    updatedAt : {
        type : Date,
        default : () => {
            return Date.now();
        }
    }
})

module.exports = mongoose.model("Movie", movieSchema)