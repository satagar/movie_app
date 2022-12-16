const { default: mongoose } = require("mongoose");
const { default: ShortUniqueId } = require("short-unique-id");

const cbfcCertifications = ['U', 'U/A', 'A', 'S'];
const statuses = ['UPCOMING', 'IN_THEATERS', 'NOT_SHOWING', 'RERUN'];

const movieSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
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
    },
});

movieSchema.pre('save', async function(next) {
    if(this.isNew) {
        const uid = new ShortUniqueId({ length: 10 });
        this.code = uid();
    }
    next();
})

module.exports = mongoose.model("Movie", movieSchema);