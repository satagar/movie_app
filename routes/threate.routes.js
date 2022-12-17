const threatreController = require('../controllers/threatre.controller');
const {validateThreatreReqBody} = require('../middlewares/verifyThreatreReqBody');
const express = require('express');
const router = express.Router();

router.post("/", validateThreatreReqBody, threatreController.createThreatre);
router.get("/", threatreController.getAllThreatres);
router.get("/:id", threatreController.getThreatreById);
router.put("/:id", validateThreatreReqBody, threatreController.updateThreatre);
router.delete("/:id", threatreController.deleteThreatre);

module.exports = router;