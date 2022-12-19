const theatreController = require('../controllers/theatre.controller');
const {validateTheatreReqBody} = require('../middlewares/verifyTheatreReqBody');
const express = require('express');
const router = express.Router();

router.post("/", validateTheatreReqBody, theatreController.createTheatre);
router.get("/", theatreController.getAllTheatres);
router.get("/:id", theatreController.getTheatreById);
router.put("/:id", validateTheatreReqBody, theatreController.updateTheatre);
router.delete("/:id", theatreController.deleteTheatre);
router.put("/:id/movies", theatreController.addMoviesToATheatre);
router.get("/:theatreId/movies/:movieId", theatreController.checkMovieInsideATheatre);

module.exports = router;