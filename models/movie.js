const { default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-generator");

const cbfcCertifications = ['U', 'U/A', 'A', 'S'];
const statuses = ['UPCOMING', 'IN_THEATERS', 'NOT_SHOWING', 'RERUN'];
const languages = ['ENGLISH', 'HINDI'];

mongoose.plugin(slug);

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    about: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String
    },
    trailerUrl: {
        type: String
    },
    runtime: {
        type: Number,
        required: true
    },
    cbfcCertification: {
        type: String,
        enum: cbfcCertifications,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: statuses,
        default: 'UPCOMING'
    },
    languages: {
        type: [String],
        enum: languages,
        required: true
    },
    genres: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'genre'
        }],
        required: true
    },
    directors: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'crew'
        }],
        required: true
    },
    writers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'crew'
        }],
        required: true
    },
    cast: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'crew'
        }],
        required: true
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }]
    }
}, {
    timestamps: true,
    statics: {
        cbfcCertifications: cbfcCertifications,
        statuses: statuses,
        languages: languages,
    },
});

module.exports = mongoose.model("Movie", movieSchema);