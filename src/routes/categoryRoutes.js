const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.listarCategorias);
router.post('/', categoryController.criarCategoria);

module.exports = router;