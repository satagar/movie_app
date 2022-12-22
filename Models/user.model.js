const mongoose = require("mongoose")


const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        lowerCase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN', 'CLIENT'],
        default: 'CUSTOMER',
        required: true
    },

    userStatus: {
        type: String,
        enum: ['PENDING', 'APPROVED'],
        default: "APPROVED",
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

module.exports = mongoose.model('User', user);