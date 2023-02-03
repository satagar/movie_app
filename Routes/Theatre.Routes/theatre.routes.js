const express = require("express");
const router = express.Router();

//----------------TheatreControllerAndMiddleware------------------
const theatreController = require('../../Controllers/Theatre.Controller/theatre.controller');
const theatreMovieController = require('../../Controllers/Theatre.Controller/theatreMovie.controller');
const theatreValidator = require('../../Utilis/validate.theatre');
const isClientOrAdmin = require('../../Middlewares/isAdminOrClient');

//-------------------Other Validators-----------------------------
const tokenValidator = require('../../Utilis/validateToken');
const isAdminValidation = require('../../Utilis/isAdmin')


//---------------------Theatre routes-----------------------------
router.post("/movie_app/api/v1/theatres", tokenValidator.validateToken, isAdminValidation.isAdmin, theatreValidator.theatreValidate, theatreController.theatreCreation);
router.get("/movie_app/api/v1/theatres", tokenValidator.validateToken, theatreController.getAlltheatres);
router.get("/movie_app/api/v1/theatres/:id", tokenValidator.validateToken, theatreController.getById);
router.get("/movie_app/api/v1/theatres/:pincode", tokenValidator.validateToken, theatreController.getByPincode);
router.get("/movie_app/api/v1/theatres/:city", tokenValidator.validateToken, theatreController.getByCity);
router.put("/movie_app/api/v1/theatres/:id", tokenValidator.validateToken, isClientOrAdmin.isAdminOrClient, theatreValidator.theatreValidate, theatreController.update);
router.delete("/movie_app/api/v1/theatres/:id", tokenValidator.validateToken, isAdminValidation.isAdmin, theatreController.delete);

//---------------------Theatre and Movie combined routes-----------------------------
router.put("/movie_app/api/v2/theatres/:id/movies", tokenValidator.validateToken, isClientOrAdmin.isAdminOrClient, theatreMovieController.addMovieToTheatre);
router.get("/movie_app/api/v1/theatres/:movieId", tokenValidator.validateToken, theatreMovieController.findTheatreByMovies); // Not Working
router.get("/movie_app/api/v2/theatres", tokenValidator.validateToken, theatreMovieController.getAllTheatres); //use /theatre?movieId=id for searching theatre by movieId
router.get("/movie_app/api/v2/theatres/:theatreId/movies/:movieId", tokenValidator.validateToken, theatreMovieController.checkMovieInsideATheatre);
router.delete("/movie_app/api/v2/theatres/:name", tokenValidator.validateToken, isAdminValidation.isAdmin, theatreMovieController.deleteByTheatreName);

module.exports = router;