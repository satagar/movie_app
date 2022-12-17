const movieController=require('../Controllers/movie.controller');
const {validateMovie}= require('../middleware/movie.middleware');
const theatreController=require('../Controllers/theatre.controller');
const {validateTheatre}=require('../middleware/theatre.middleware');
const express=require('express');
const { validateTheatre } = require('../middleware/theatre.middleware');
const router=express.Router();

router.post("/mba/api/v1/movies", validateMovie, movieController.createMovie);


router.post("/mba/api/v1/theatre", validateTheatre, theatreController.createTheatre);

module.exports=router;