const { default: mongoose } = require("mongoose");

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Genre", genreSchema);