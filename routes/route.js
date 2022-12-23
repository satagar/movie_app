const movieController=require('../Controllers/movie.controller');
const movieMiddleware= require('../middleware/movie.middleware');
const theatreController=require('../Controllers/theatre.controller');
const theatreMiddleware=require('../middleware/theatre.middleware');
const authController=require('../Controllers/auth.controller');
const express=require('express');
const router=express.Router();


// router.post('/mba/api/v1/movies/seed',movieController. );
router.post('/mba/api/v1/movies', movieMiddleware.validateMovie, movieController.createMovie);
router.get('/mba/api/v1/movies/:id',movieController.getMovieById);
router.get('/mba/api/v1/movies/all',movieController.getAllMovies);
router.put('/mba/api/v1/movies/update/:id',movieController.updateMovie);
router.delete('/mba/api/v1/movies/delete/:id',movieController.deleteMovie);



router.post('/mba/api/v1/theatre', theatreMiddleware.validateTheatre, theatreController.createTheatre);
router.get('/mba/api/v1/theatre/:id', theatreController.getTheatreById);
router.get('/mba/api/v1/theatre/all', theatreController.grtAlltheatre);
router.put('/mba/api/v1/theatre/update/:id', theatreController.updateTheatre);
router.delete('/mba/api/v1/theatre/delete/:id', theatreController.deleteTheatre);
router.put('/mba/api/v1/theatre/:id/movie',theatreController.addMovieToTheatre)
router.get('/mba/api/v1/theatres/:movieId',theatreController.getTheatreByMovie)
router.get('/mba/api/v1/theatres/:theatreId/movie/:movieId',theatreController.MovieInsideTheTheatre)

//user
router.post('/mba/api/v1/auth/signup', authController.signup);

module.exports=router;