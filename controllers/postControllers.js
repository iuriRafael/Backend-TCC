
const Post = require('../model/post');

exports.Postagem = async (req, res) => {
  try {
    const { imagem, descricao, localizacao } = req.body;

    const newPost = await Post.create({ imagem, descricao, localizacao });

    res.status(201).json({ message: 'Postagem criada com sucesso', postagem: newPost });
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    res.status(500).json({ error: 'Erro ao criar a postagem' });
  }
};


exports.listarPostagens = async (req, res) => {
  try {
    const postagens = await Post.find().populate('userId', 'nome'); // Popula o nome do usuário

    res.json(postagens);
  } catch (error) {
    console.error('Erro ao listar postagens:', error);
    res.status(500).json({ error: 'Erro ao listar postagens' });
  }
};
