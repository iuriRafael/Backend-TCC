
const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.cadastro = async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
  
      // Crie um novo usuário
      const newUser = await User.create({
        nome,
        email,
        senha,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'Cadastro bem-sucedido', nome: newUser.nome, token });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o usuário' });
    }
  };


  exports.login = async (req, res) => {
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

      const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Login bem-sucedido
      res.json({ message: 'Login bem-sucedido', nome: user.nome, token});
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  };