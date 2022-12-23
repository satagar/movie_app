const movie = require('../controllers/movie.controller')
const { validateMovie } = require("../middlewares/movie.Validator")
//const express = require('express')
//const router = express.Router()

module.exports = function (app) {
    app.post('/mba/api/v1/movies/', validateMovie, movie.createMovie)
    app.get('/mba/api/v1/movies/', movie.getAllMovies)
    app.get('/mba/api/v1/movies/:id', movie.getMovieById)
    app.get('/mba/api/v1/movies?name=', movie.getMovieByName)
    app.put('/mba/api/v1/movies/:id', validateMovie, movie.updateMovie)
    app.delete('/mba/api/v1/movies/:id', movie.deleteMovie)
}