const express = require("express");
const router = express.Router();
const validateMovie = require("../Utilis/validate.movie")
const movieController = require("../Controllers/movie.controller")
const authController = require("../Controllers/auth.controller")

const validateTheatre = require("../Utilis/validate.threatre");
const theatreController = require("../Controllers/threatre.controller")

//-------------------------User ------------------------------------
router.post("/movie_app/api/v1/auth/signup", authController.signUp);
router.post("/movie_app/api/v1/auth/login", authController.login);
//--------------------Movie routes ---------------------------------
router.post("/movie_app/api/v1/movies", validateMovie.movieValidate, movieController.movieCreation);
router.get("/movie_app/api/v1/movies", movieController.getAllMovies);

//---------------------Theatre routes-----------------------------
router.post("/movie_app/api/v1/theatres", validateTheatre.theatreValidate, theatreController.theatreCreation);
router.get("/movie_app/api/v1/theatres", theatreController.getAlltheatres);

module.exports = router;