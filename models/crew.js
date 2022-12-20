const { default: mongoose } = require("mongoose");

const crewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Crew", crewSchema);