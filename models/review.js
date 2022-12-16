const { default: mongoose } = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    recommends: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);