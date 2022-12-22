const movie = require('../controllers/movie.controller')
const { validateMovie } = require("../middlewares/movie.Validator")

module.exports = function (app) {
    movie.post('/mba/api/v1/movies/', validateMovie, movie.createMovie)
    movie.get('/mba/api/v1/movies/', movie.getAllMovies)
    movie.get('/mba/api/v1/movies/:id', movie.getMovieById)
    movie.get('/mba/api/v1/movies?name=', movie.getMovieByName)
    movie.put('/mba/api/v1/movies/:id', validateMovie, movie.updateMovie)
    movie.delete('/mba/api/v1/movies/:id', movie.deleteMovie)
}