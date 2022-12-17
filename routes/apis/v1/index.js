const express = require('express');
const route = express.Router();
const movieController = require('../../../controllers/movie.controller')
const movieMiddleware  =require('../../../middleware/movieValidation.middleware')
const theaterMiddleware = require('../../../middleware/theaterValidate.middleware')
const theaterController = require('../../../controllers/theater.controller')
route.post('/movie/create',movieMiddleware.movieValidate,movieController.createMovies)
route.get('/movie/filter',movieController.movieFilter)
route.put('/movie/update/:id',movieController.updateMovie)
route.delete('/movie/delete/:id',movieController.deleteMovie)
//------------------------------------------Theater routes---------------------------------------------
route.post('/theater/create',theaterMiddleware.theaterReqBodyValidate,theaterController.createTheater)
route.get('/theater/:id',theaterController.getTheaterById)
route.get('/theater/filter',theaterController.getTheaterByAllFileds)
route.put('/theater/update/:id',theaterController.updateTheater)
route.delete('/theater/delete/:id',theaterController.deleteTheater)

module.exports = route;