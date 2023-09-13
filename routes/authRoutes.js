const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');


router.post('/cadastro', authController.cadastro);

// Rota para login de usuário
router.post('/login', authController.login);



module.exports = router;