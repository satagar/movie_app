const { default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-generator");
const { Movie } = require(".");
const { isObjectId } = require("../helpers");

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
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    }],
    shows: {
        type: [{
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
        }]
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
    methods: {
        addMovies(movieIds) {
            for(id of movieIds) {
                if(isObjectId(id) && await Movie.findById(id)) {
                    this.movies.push(id);
                }
                else {
                    throw new Error(`${id} is not a valid movie id`);
                }
            }
        },
        removeMovies(movieIds) {
            for(id of movieIds) {
                if(isObjectId(id) && await Movie.findById(id)) {
                    const index = this.movies.findIndex(m => m === id);
                    if(index >= 0) this.movies.splice(index, 1);
                }
                else {
                    throw new Error(`${id} is not a valid movie id`);
                }
            }
        },

    }
});

module.exports = mongoose.model("Theater", theaterSchema);