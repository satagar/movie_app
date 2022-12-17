const { default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-generator");

const facilities = ['FOOD_COURT', 'WIFI', 'PARKING'];

mongoose.plugin(slug);

const theaterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        type: Array,
        required: true,
    },
    facilities: {
        type: [String],
    },
    refundsEnabled: {
        type: Boolean,
        default: false
    },
    shows: {
        type: [
            {
                movie: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'movie'
                },
                language: String,
                timings: [
                    {
                        date: Date,
                        hour: Number,
                        minute: Number,
                        ticketPrice: Number,
                        screen: Number
                    }
                ]
            }
        ]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true,
    statics: {
        facilities: facilities
    },
});

module.exports = mongoose.model("Theater", theaterSchema);