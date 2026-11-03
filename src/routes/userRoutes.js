const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota GET para listar utilizadores
router.get('/', userController.listarUsuarios);

// Rota POST para criar um novo utilizador
router.post('/', userController.criarUsuario);

module.exports = router;