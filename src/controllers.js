const User = require('../model/user');

exports.cadastrarUsuario = async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
  
      // Criando um novo usuário
      const newUser = new User({ nome, email, senha });
  
      // Salvando o usuário no banco de dados
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  };