const movieController = require('../controllers/movie.controller');
const { validateMovieReqBody } = require('../middlewares/verifyMovieReqBody');
const express = require('express');
const router = express.Router();

router.post("/mba/api/v1/movies", validateMovieReqBody,movieController.createMovie);
router.get("/mba/api/v1/movies", movieController.getAllMovies);

module.exports = router;