const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.listarEventos);
router.post('/', eventController.criarEvento);

module.exports = router;