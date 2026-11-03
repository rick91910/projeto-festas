const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.listarPresencas);
router.post('/', attendanceController.criarPresenca);

module.exports = router;