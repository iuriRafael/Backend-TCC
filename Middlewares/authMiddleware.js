const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação ausente' });
    }
    jwt.verify(token, 'iurikannemann', async (err, decodedToken) => {
      if (err) {
        console.error('Erro ao verificar token JWT:', err);
        return res.status(401).json({ error: 'Token de autenticação inválido' });
      }
  
      try {
  
        const user = await User.findById(decodedToken.userId);
  
        if (!user) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }
  
        req.user = user;
  
        next();
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuário' });
      }
    });
  };
  
  module.exports = { requireAuth };