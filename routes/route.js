const movieController=require('../Controllers/movie.controller');
const {validateMovie}= require('../middleware/movie.middleware')
const express=require('express');
const router=express.Router();

router.post("/mba/api/v1/movies", validateMovie, movieController.createMovie);


module.exports=router;