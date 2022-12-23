const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
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
    },
    userType: {
        type: String,
        required: true,
        default: "customer"
    },
    userStatus: {
        type: String,
        required: true,
        default: "approved"
    }
})

module.exports = mongoose.model('userModel', userSchema)