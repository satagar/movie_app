const express = require("express");
const router = express.Router();

//-------------------BookingCOntrollerAndMiddleware-----------
const bookingController = require("../Controllers/createBooking.controller")
const validateBookingReq = require("../Middlewares/verifyBookingReq")
const updateBookingController = require("../Controllers/updateBooking.controller")

//------------------UserController-----------------------------
const authController = require("../Controllers/auth.controller")
const updateController = require("../Controllers/auth.update.controller")
const findAllController = require("../Controllers/auth.getAllUser.controller")

//-----------------UserMiddlewares-------------------------------
const UserMiddleware = require("../Middlewares/verifyUserReq")
const UpdateMiddleware = require("../Middlewares/verifyUserReq")

//----------------MovieControllerAndMiddleware--------------------
const validateMovie = require("../Utilis/validate.movie")
const movieController = require("../Controllers/movie.controller")

//----------------TheatreControllerAndMiddleware------------------
const validateTheatre = require("../Utilis/validate.theatre");
const theatreController = require("../Controllers/theatre.controller");
const theatreMovieController = require("../Controllers/theatreMovie.controller")

//-------------------Other Validators-----------------------------
const validate = require("../Utilis/validateToken")
const isAdminvalidation = require("../Utilis/isAdmin");

//-----------------------------------------ROUTES-----------------------------------------------------------------

//---------------------------Booking routes------------------------------------
router.post("/movie_app/api/v1/bookings", validate.validateToken, validateBookingReq.verifyBooking, bookingController.createBooking)
router.put("/movie_app/api/v1/bookings/:id", validate.validateToken, isAdminvalidation.isAdmin, updateBookingController.updateBooking)
    //-------------------------User ------------------------------------
router.post("/movie_app/api/v1/auth/signup", UserMiddleware.verifyUserRequest, authController.signup);
router.post("/movie_app/api/v1/auth/login", authController.login);
router.get("/movie_app/api/v1/users", validate.validateToken, isAdminvalidation.isAdmin, findAllController.findAll) //Help in Checking Failure cases
router.put("/movie_app/api/v1/users", validate.validateToken, UpdateMiddleware.verifyUserStatus, updateController.update)
router.put("/movie_app/api/v1/users/:userId", validate.validateToken, isAdminvalidation.isAdmin, isAdminvalidation.isAdmin, UpdateMiddleware.verifyUserStatus, updateController.userUpdate)


//--------------------Movie routes ---------------------------------
router.post("/movie_app/api/v1/movies", validate.validateToken, isAdminvalidation.isAdmin, validateMovie.movieValidate, movieController.movieCreation);
router.get("/movie_app/api/v1/movies", validate.validateToken, movieController.getAllMovies);
router.get("/movie_app/api/v1/movies/:id", validate.validateToken, movieController.getById); //http://localhost:5500/movie_app/api/v1/movies/639dd490c7a8f38a0572e033
router.put("/movie_app/api/v1/movies/:id", validate.validateToken, isAdminvalidation.isAdmin, movieController.update);
router.delete("/movie_app/api/v1/movies/:id", validate.validateToken, isAdminvalidation.isAdmin, movieController.delete);


//---------------------Theatre routes-----------------------------
router.post("/movie_app/api/v1/theatres", validate.validateToken, isAdminvalidation.isAdmin, validateTheatre.theatreValidate, theatreController.theatreCreation);
router.get("/movie_app/api/v1/theatres", validate.validateToken, theatreController.getAlltheatres);
router.get("/movie_app/api/v1/theatres/:id", validate.validateToken, theatreController.getById);
router.get("/movie_app/api/v1/theatres/:pincode", validate.validateToken, theatreController.getByPincode);
router.get("/movie_app/api/v1/theatres/:city", validate.validateToken, theatreController.getByCity);
router.put("/movie_app/api/v1/theatres/:id", validate.validateToken, isAdminvalidation.isAdmin, validateTheatre.theatreValidate, theatreController.update);
router.delete("/movie_app/api/v1/theatres/:id", validate.validateToken, isAdminvalidation.isAdmin, theatreController.delete);



//---------------------Theatre and Movie combined routes-----------------------------
router.put("/movie_app/api/v2/theatres/:id/movies", validate.validateToken, isAdminvalidation.isAdmin, theatreMovieController.addMovieToTheatre);
router.get("/movie_app/api/v1/theatres/:movieId", validate.validateToken, theatreMovieController.findTheatreByMovies); // Not Working
router.get("/movie_app/api/v2/theatres", validate.validateToken, theatreMovieController.getAllTheatres); //use /theatre?movieId=id for searching theatre by movieId
router.get("/movie_app/api/v2/theatres/:theatreId/movies/:movieId", validate.validateToken, theatreMovieController.checkMovieInsideATheatre);
router.delete("/movie_app/api/v2/theatres/:name", validate.validateToken, isAdminvalidation.isAdmin, validate.validateToken, isAdminvalidation.isAdmin, theatreMovieController.deleteByTheatreName)

module.exports = router;