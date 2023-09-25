const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { requireAuth } = require('../Middlewares/authMiddleware');

router.post('/cadastro', authController.cadastro);

// Rota para login de usuário
router.post('/login', authController.login);

router.get('/getUserId', requireAuth, (req, res) => {
    // O middleware requireAuth verifica se o usuário está autenticado e define req.user
    const userId = req.session.userId; // Suponha que você armazena o ID do usuário na propriedade "_id" do documento do usuário
    res.json({ userId });
  });



module.exports = router;