const movieController = require('../controllers/movie.controller');
const { validateMovieReqBody } = require('../middlewares/verifyMovieReqBody');
const express = require('express');
const router = express.Router();

router.post("/", validateMovieReqBody,movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.put("/:id", validateMovieReqBody, movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;