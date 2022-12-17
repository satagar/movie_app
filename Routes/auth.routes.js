const express = require("express");
const router = express.Router();
const validateMovie = require("../Utilis/validate.movie")
const movieController = require("../Controllers/movie.controller")
const authController = require("../Controllers/auth.controller")

router.post("/movie_app/api/v1/auth/sign", authController.signUp);
router.post("/movie_app/api/v1/auth/login", authController.login);
router.post("/movie_app/api/v1/movies", validateMovie, movieController.movieCreation);
router.get("/movie_app/api/v1/movies", movieController.getAllMovies);

module.exports = router;