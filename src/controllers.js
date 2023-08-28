const User = require('../model/user');
const Post = require('../model/post');
const fs = require('fs');
const path = require('path');
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

exports.criarPublicacao = async (req, res) => {
  try {
    req.body.files.forEach((file) => {
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, 'base64');
      const imagePath = './uploads/'+Date.now()+".png"; // Caminho para salvar a imagem
      const {nome, descricao , endereco , referencia} = req.body
      const newPost = new Post({
        image:imagePath,
        nome: nome,
        description: descricao,
        address: endereco,
        time: new Date(),
        references: referencia

      });
      fs.writeFileSync(path.resolve(imagePath), imageBuffer, (error) => {
        if (error) {
          console.error('Error saving image:', error);
          res.status(500).json({ message: 'Error saving image' });
        } else {
          console.log('Image saved successfully');
          res.json({ message: 'Image saved successfully' });
        }
      });
      newPost.save();
    })

  } catch (error) {

  }
};