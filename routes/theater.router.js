const express = require('express');
const { createTheater, getAllTheaters, deleteTheater, updateTheater } = require('../controllers/theaterController');
const { theaterReqVal } = require('../middleware/theaterValidator');


const router = express.Router();

router.post('/create', theaterReqVal, createTheater);
router.get('/get', getAllTheaters);
router.delete('/del/:id', deleteTheater);
router.put('/update/:id', updateTheater)

module.exports = router;   