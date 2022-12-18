const express = require('express');
const { createMovie, deleteMovie, getMovie, updateMovie, getAllMovie } = require('../controllers/movieController');
const { movieReqVal } = require('../middleware/movieValidator');


const router = express.Router();

router.post('/create', movieReqVal, createMovie);
router.delete('/delete/:name', deleteMovie);
router.get('/get', getMovie);
router.put('/update/:id', updateMovie);
router.get('/', getAllMovie);

module.exports = router;   