const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
  
    // Verifique se o token JWT está presente nas informações de autorização
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação ausente' });
    }
  
    // Verifique o token JWT
    jwt.verify(token, 'iurikannemann', async (err, decodedToken) => {
      if (err) {
        console.error('Erro ao verificar token JWT:', err);
        return res.status(401).json({ error: 'Token de autenticação inválido' });
      }
  
      try {
        // Verifique se o usuário com o ID do token existe no banco de dados
        const user = await User.findById(decodedToken.userId);
  
        if (!user) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }
  
        // Se o usuário existir, adicione o objeto de usuário à solicitação para uso posterior
        req.user = user;
  
        // Continue para a próxima rota ou middleware
        next();
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuário' });
      }
    });
  };
  
  module.exports = { requireAuth };