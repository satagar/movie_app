const express = require('express');
const route = express.Router();
const movieController = require('../../../controllers/movie.controller')
const movieMiddleware  =require('../../../middleware/movieValidation.middleware')
const theaterMiddleware = require('../../../middleware/theaterValidate.middleware')
const theaterController = require('../../../controllers/theater.controller')
const authController = require('../../../controllers/auth.controller')
const authMiddleware = require('../../../middleware/authValidate.middleware')
const bookingController = require('../../../controllers/booking.controller')
const bookingMiddleware = require('../../../middleware/bookingValidation.middleware')
//------------------------------------------Movie routes---------------------------------------------
route.post('/movie/create',movieMiddleware.movieValidate,movieController.createMovies)
route.get('/movie/filter',authMiddleware.isAuthorized,movieController.movieFilter)
route.put('/movie/update/:id',authMiddleware.isAuthorized,authMiddleware.isAdmin,movieController.updateMovie)
route.delete('/movie/delete/:id',authMiddleware.isAuthorized,authMiddleware.isAdmin,movieController.deleteMovie)
//------------------------------------------Theater routes---------------------------------------------
route.post('/theater/create',authMiddleware.isAuthorized,theaterMiddleware.theaterReqBodyValidate,theaterController.createTheater)
route.get('/theater/:id',theaterController.getTheaterById)
route.get('/theaters/filter',authMiddleware.isAuthorized,theaterController.getTheaterByAllFileds)
route.put('/theater/update/:id',authMiddleware.isAuthorized,authMiddleware.isAdmin,theaterController.updateTheater)
route.delete('/theater/delete/:id',authMiddleware.isAuthorized,authMiddleware.isAdmin,theaterController.deleteTheater)
route.put('/theater/:id/movies',authMiddleware.isAuthorized,authMiddleware.isAdmin,theaterController.addMovieToTheater)
route.get('/theaters/:movieId',authMiddleware.isAuthorized,theaterController.getTheaterByMovie)
route.get('/theaters/:theaterId/movies/:movieId',authMiddleware.isAuthorized,theaterController.MovieInsideTheTheater)
route.delete('/theater/delete/:name',authMiddleware.isAuthorized,authMiddleware.isAdmin,theaterController.deleteTheaterByName)
//-----------------------------------------Authentication Routes -------------------------------
route.post('/user/signup',authMiddleware.authBodyValidate,authController.signup)
route.post('/user/signin',authMiddleware.isValidBodyForSignin,authController.signin)
route.put('/user/update-password',authMiddleware.updateValidation,authMiddleware.isAuthorized,authController.UpdatePassword);
route.put('/users/update/:id',authMiddleware.isAuthorized,authMiddleware.isAdmin,authController.updateUser)
route.get('/users/filter',authMiddleware.isAuthorized,authMiddleware.isAdmin,authController.userFilter)
//-----------------------------------------Movie booking routes----------------------------------------
route.post('/movies/booking',authMiddleware.isAuthorized,bookingMiddleware.validateBookingBody,bookingController.CreateBooking)
route.put('/movies/booking/update/:id',authMiddleware.isAuthorized,bookingMiddleware.updateBodyValidate,bookingController.bookingUpdate)
route.get('/movies/booking/:id',authMiddleware.isAuthorized,bookingController.getBookingByID)
route.get('/movies/bookings',authMiddleware.isAuthorized,authMiddleware.isAdmin,bookingController.getAllBooking)
module.exports = route;

