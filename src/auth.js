const express = require ('express');
const router = express.Router();
const User = require ('../model/user');

router.post('/login', async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Verificar se o usuário existe no banco de dados
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Verificar se a senha está correta
      if (user.senha !== senha) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
  
      // Login bem-sucedido
      res.json({ message: 'Login bem-sucedido' });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  });
  
  module.exports = router;