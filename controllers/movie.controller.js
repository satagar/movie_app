const movieModel = require('../models/movies.model')
const constants = require('../constants/constants')

exports.createMovie = async (req, res) => {
    const addMovie = {
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus,
        director: req.body.director,
        language: req.body.language,
        posterURL: req.body.posterURL,
        trailerURL: req.body.trailerURL,
        cast: req.body.cast
    }
    const addedMovie = await movieModel.create(addMovie)
    res.status(201).send(addedMovie)
}

exports.getAllMovies = async (req, res) => {
    try {
        const findMovies = {}
        if (req.query.name != undefined) {
            findMovies.name = req.query.name
        }
        if (req.query.language != undefined) {
            findMovies.language = req.query.language
        }
        const foundMovies = await movieModel.find(findMovies)
        res.status(200).send(foundMovies)
    } catch (err) {
        res.status(400).send({
            message: "Requested movies not found!"
        })
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const findMovie = await movieModel.findOne({ movieId: req.params.movieId })
        res.status(200).send(findMovie)
    } catch (error) {
        res.status(400).send({
            message: "Requested movie not found!"
        })
    }
}

exports.getMovieByName = async (req, res) => {
    try {
        const getMovie = await movieModel.findOne({ name: req.params.name })
        res.status(200).send(getMovie)
    } catch (error) {
        res.status(400).send({
            message: "Requested movie not found!"
        })
    }
}

exports.updateMovie = async (req, res) => {
    const existingMovie = await movieModel.findOne({ movieId: req.params.movieId })
    if (!existingMovie) {
        res.status(400).send({
            message: " Movie name doesn't exist in the database!"
        })
    }
    if (req.body.name != undefined) {
        existingMovie = req.body.name
    } else {
        existingMovie = existingMovie.name
    }
    if (req.body.description != undefined) {
        existingMovie = req.body.description
    } else {
        existingMovie = existingMovie.description
    }
    if (req.body.releaseDate != undefined) {
        existingMovie = req.body.releaseDate
    } else {
        existingMovie = existingMovie.releaseDate
    }
    if (req.body.releaseStatus != undefined) {
        existingMovie = req.body.releaseStatus
    } else {
        existingMovie = existingMovie.releaseStatus
    }
    if (req.body.director != undefined) {
        existingMovie = req.body.director
    } else {
        existingMovie = existingMovie.director
    }
    if (req.body.language != undefined) {
        existingMovie = req.body.language
    } else {
        existingMovie = existingMovie.language
    }
    if (req.body.posterURL != undefined) {
        existingMovie = req.body.posterURL
    } else {
        existingMovie = existingMovie.posterURL
    }
    if (req.body.trailerURL != undefined) {
        existingMovie = req.body.trailerURL
    } else {
        existingMovie = existingMovie.trailerURL
    }
    if (req.body.cast != undefined) {
        existingMovie = req.body.cast
    } else {
        existingMovie = existingMovie.cast
    }
    var updatedMovie = await existingMovie.save()
    res.status(200).send(updatedMovie)
}

exports.deleteMovie = async (req, res) => {
    const deletedMovie = await movieModel.deleteOne({ movieId: req.params.movieId })
    res.status(200).send(deletedMovie)
}