const express = require("express");
const router = express.Router();

//----------------MovieControllerAndMiddleware--------------------
const movieValidator = require('../../Utilis/validate.movie');
const movieController = require('../../Controllers/Movie.Controller/movie.controller');

//-------------------Other Validators-----------------------------
const tokenValidator = require('../../Utilis/validateToken');
const isAdminValidation = require('../../Utilis/isAdmin');


//--------------------Movie routes ---------------------------------
router.post("/movie_app/api/v1/movies", tokenValidator.validateToken, isAdminValidation.isAdmin, movieValidator.movieValidate, movieController.movieCreation);
router.get("/movie_app/api/v1/movies", tokenValidator.validateToken, movieController.getAllMovies);
router.get("/movie_app/api/v1/movies/:id", tokenValidator.validateToken, movieController.getById); //http://localhost:5500/movie_app/api/v1/movies/639dd490c7a8f38a0572e033
router.put("/movie_app/api/v1/movies/:id", tokenValidator.validateToken, isAdminValidation.isAdmin, movieController.update);
router.delete("/movie_app/api/v1/movies/:id", tokenValidator.validateToken, isAdminValidation.isAdmin, movieController.delete);

module.exports = router;