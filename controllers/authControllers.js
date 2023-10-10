
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

      req.session.nome = newUser.nome;
      req.session.userId = newUser._id;

      const usuario_id = newUser._id;
      console.log('testando novo usuario : '+ usuario_id);

      const token = jwt.sign({ userId: newUser._id }, 'iurikannemann');

      res.status(201).json({ message: 'Cadastro bem-sucedido', nome: newUser.nome, token, usuario_id , email});
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

        req.session.nome = user.nome;
        req.session.userId = user._id;

        const usuario_id = user._id;
        console.log('testando usuario: '+ usuario_id);

        const token = jwt.sign({ userId: user._id }, 'iurikannemann');

        

        res.status(200).json({ message: 'Login bem-sucedido', nome: user.nome, token, usuario_id, email});
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
};



