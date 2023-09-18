
const Post = require('../model/post');

// Função para fazer upload de imagem com descrição e localização
exports.uploadImage = async (req, res) => {
  try {
    const { description, location, imagePath } = req.body;

    // Crie uma nova instância do modelo de imagem
    const post = new Post({ description, location, imagePath });

    // Salve o post no banco de dados
    await post.save();

    res.json({ message: 'Salvo com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem.' });
  }
};

exports.listImages = async (req, res) => {
  try {
    // Selecione os campos que você deseja retornar
    const images = await Post.find({});

    console.log(images); // Adicione esta linha para depurar

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar as imagens.' });
  }
};