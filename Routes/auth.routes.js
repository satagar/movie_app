const express = require("express");
const router = express.Router();
const validateMovie = require("../Utilis/validate.movie")
const movieController = require("../Controllers/movie.controller")
const authController = require("../Controllers/auth.controller")

const validateTheatre = require("../Utilis/validate.theatre");
const theatreController = require("../Controllers/theatre.controller");
const theatreMovieController = require("../Controllers/theatreMovie.controller")

//-------------------------User ------------------------------------
router.post("/movie_app/api/v1/auth/signup", authController.signUp);
router.post("/movie_app/api/v1/auth/login", authController.login);


//--------------------Movie routes ---------------------------------
router.post("/movie_app/api/v1/movies", validateMovie.movieValidate, movieController.movieCreation);
router.get("/movie_app/api/v1/movies", movieController.getAllMovies);
router.get("/movie_app/api/v1/movies/:id", movieController.getById); //http://localhost:5500/movie_app/api/v1/movies/639dd490c7a8f38a0572e033
router.put("/movie_app/api/v1/movies/:id", movieController.update);
router.delete("/movie_app/api/v1/movies?_id:id", movieController.delete);


//---------------------Theatre routes-----------------------------
router.post("/movie_app/api/v1/theatres", validateTheatre.theatreValidate, theatreController.theatreCreation);
router.get("/movie_app/api/v1/theatres", theatreController.getAlltheatres);
router.get("/movie_app/api/v1/theatres/:id", theatreController.getById);
router.get("/movie_app/api/v1/theatres/:pincode", theatreController.getByPincode);
router.get("/movie_app/api/v1/theatres/:city", theatreController.getByCity);
router.put("/movie_app/api/v1/theatres/:id", theatreController.update);
router.delete("/movie_app/api/v1/theatres/:id", theatreController.delete);



//---------------------Theatre and Movie combined routes-----------------------------
router.put("/movie_app/api/v2/theatres/:id/movies", theatreMovieController.addMovieToTheatre);
router.get("/movie_app/api/v1/theatres/:movieId", theatreMovieController.findTheatreByMovies); // Not Working
router.get("/movie_app/api/v2/theatres", theatreMovieController.getAllTheatres); //use /theatre?movieId=id for searching theatre by movieId
router.get("/movie_app/api/v2/theatres/:theatreId/movies/:movieId", theatreMovieController.checkMovieInsideATheatre);

module.exports = router;