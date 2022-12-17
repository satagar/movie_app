const movieController = require('../controllers/movie.controller');
const { validateMovieReqBody } = require('../middlewares/verifyMovieReqBody');
const express = require('express');
const router = express.Router();

router.post("/mba/api/v1/movies", validateMovieReqBody,movieController.createMovie);
router.get("/mba/api/v1/movies", movieController.getAllMovies);
router.get("/mba/api/v1/movies/:id", movieController.getMovieById);
router.put("/mba/api/v1/movies/:id", movieController.updateMovie);
router.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);

module.exports = router;