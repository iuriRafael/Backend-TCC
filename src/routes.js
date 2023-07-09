const express = require('express');
const router = express.Router();
const UserController = require('./controllers');

// Rota para cadastrar um usuário
router.post('/cadastro', UserController.cadastrarUsuario);

module.exports = router;