const movieController=require('../Controllers/movie.controller');
const movieMiddleware= require('../middleware/movie.middleware');
const theatreController=require('../Controllers/theatre.controller');
const theatreMiddleware=require('../middleware/theatre.middleware');
const authController=require('../Controllers/auth.controller');
const authMiddleware=require('../middleware/auth.middleware');
const bookingController=require('../Controllers/booking.controller');
const bookingMiddleware=require('../middleware/booking.middleware');
const paymentController=require('../Controllers/payment.controller');
const paymentMiddleware=require('../middleware/payment.middleware');
const express=require('express');
const router=express.Router();



router.post('/mba/api/v1/movies', movieMiddleware.validateMovie, movieController.createMovie);
router.get('/mba/api/v1/movie/:id',movieController.getMovieById);
router.get('/mba/api/v1/movies/all',movieController.getAllMovies);
router.put('/mba/api/v1/movies/update/:id',movieController.updateMovie);
router.delete('/mba/api/v1/movies/delete/:id',movieController.deleteMovie);



router.post('/mba/api/v1/theatre', theatreMiddleware.validateTheatre, theatreController.createTheatre);
router.get('/mba/api/v1/theatre/:id', theatreController.getTheatreById); //ok
router.get('/mba/api/v1/theatres/all', theatreController.grtAlltheatre);
router.put('/mba/api/v1/theatre/update/:id', theatreController.updateTheatre);
router.delete('/mba/api/v1/theatre/delete/:id', theatreController.deleteTheatre);
router.put('/mba/api/v1/theatre/:id/movie',theatreController.addMovieToTheatre);
router.get('/mba/api/v1/theatres/:movieId',theatreController.getTheatreByMovie); //ok
router.get('/mba/api/v1/theatres/:theatreId/movie/:movieId',theatreController.MovieInsideTheTheatre)

//user
router.post('/mba/api/v1/auth/signup',authMiddleware.validateAuth, authController.signup);
router.post('/mba/api/v1/auth/signin', authController.signin);
router.put('/mba/api/v1/auth/update/:id',authMiddleware.updateValidaton, authController.signin);

//booking
router.post('/mba/api/v1/booking/create', bookingMiddleware.validateBooking,  bookingController.createBooking);
router.post('/mba/api/v1/booking/update',  bookingController.updateBooking);
router.get('/mba/api/v1/booking/allbooking',  bookingController.getAllBooking);
router.get('/mba/api/v1/booking/:id',  bookingController.createBooking);

//payments
router.post('/mba/api/v1/payment/create', paymentMiddleware.verifyPayment, paymentController.createPayment );
router.get('/mba/api/v1/payments/allpayment', paymentController.getAllpayments);
router.get('/mba/api/v1/payment/:id',  paymentController.getPaymentById);



module.exports=router;