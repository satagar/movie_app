const movieModel = require('../models/movies.model')
exports.getAllMovies = async (req, res) => {
    const Movies = {}
    if (req.params.name != undefined) {
        Movies.name = req.params.name
    }
    const movies = await movieModel.find(Movies)
    res.status(200).send(movies)

}

exports.getMovieById = async (req, res) => {
    const Movie = await movieModel.findOne({ _id: req.params._id })
    res.status(200).send(Movie)
}

exports.getMovieByName = async (req, res) => {
    const Movie = await movieModel.findOne({ name: req.params.name })
    res.status(200).send(Movie)
}

exports.deleteMovie = async (req, res) => {
    const Movie = await movieModel.deleteOne({ _id: req.params._id })
    res.status(200).send(Movie)
}