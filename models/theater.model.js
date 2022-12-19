const mongoose = require('mongoose');
const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        required: true
    },
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'movies'
    },
    createAt: {
        type: String,
        default: () => {
            return Date.now()
        },
        immutable: true
    },
    updatedAt: {
        type: String,
        default: () => {
            return Date.now()
        }
    }
})

const theaterModel = mongoose.model('theater', theaterSchema)
module.exports = theaterModel;