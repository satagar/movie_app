const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
  {
    movie_item: {
      type: String,
      required: true,
      maxlength: 50,
    },
    name: {
      type: String,
      required: [true, 'Please provide movie name'],
      maxlength: 50,
    },
    description: {
      type: String,
      required: true
    },
    relese_date: {
      type: Date,
      required: true
    },
    relese_status: {
        type: String,
        required: true
      },
      Director: {
        type: String,
        required: true
      },
      Language: {
        type: String,
        required: true
      },
      Poster_Url: {
        type: String,
        required: true
      },
      Casts: {
        type: Array,
        required: true
      },
      Trailer_Url: {
        type: String,
        required: true
      },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Movie', MovieSchema)
