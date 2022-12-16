const express = require('express');
const route = express.Router();
const movieController = require('../../../controllers/movie.controller')
const movieMiddleware  =require('../../../middleware/movieValidation.middleware')
route.post('/movie/create',movieMiddleware.movieValidate,movieController.createMovies)
module.exports = route;