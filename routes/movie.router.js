const express = require('express');
const { createMovie, deleteMovie, getMovie, updateMovie } = require('../controllers/movieController');


const router = express.Router();

router.post('/create', createMovie);
router.delete('/delete/:name', deleteMovie);
router.get('/:name', getMovie);
router.put('/update', updateMovie);

module.exports = router;   