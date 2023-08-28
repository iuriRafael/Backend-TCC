const express = require('express');
const router = express.Router();
const UserController = require('./controllers');

// Rota para cadastrar um usuário
router.post('/cadastro', UserController.cadastrarUsuario);

router.post("/Postar",UserController.criarPublicacao)

// router.post("/postar", createby)

module.exports = router;