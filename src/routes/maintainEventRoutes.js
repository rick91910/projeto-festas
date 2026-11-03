const express = require('express');
const router = express.Router();
const maintainEventController = require('../controllers/maintainEventController');

router.get('/', maintainEventController.listarManutenções);
router.post('/', maintainEventController.criarManutenção);

module.exports = router;