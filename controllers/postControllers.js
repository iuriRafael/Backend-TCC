const Post = require('../model/post');
const fs = require('fs');
const path = require('path');
const ConcludedPost = require('../model/concludedPost');



// Função para fazer upload de imagem com descrição e localização
exports.uploadImage = async (req, res) => {
  try {
    const imageInfos = [];
    const userId = req.body.userId;

    console.log('ID do usuário:', userId);

    for (const file of req.body.files) {
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, 'base64');
      const imagePath = './uploads/' + Date.now() + '.png'; // Caminho para salvar a imagem
      const { description, location } = req.body;

      // Salvar a imagem no servidor
      fs.writeFileSync(path.resolve(imagePath), imageBuffer);

      // Criar um objeto de informações da imagem
      const imageInfo = {
        image: imagePath,
        description: description,
        location: location,
        userId: userId,
      };

      imageInfos.push(imageInfo);
    }

    // Salvar as informações das imagens no banco de dados
    const savedImages = await Post.insertMany(imageInfos);

    console.log('Imagens salvas com sucesso no banco de dados:', savedImages);
    res.json({ message: 'Imagens salvas com sucesso no banco de dados' });
  } catch (error) {
    console.error('Erro ao salvar imagens:', error);
    res.status(500).json({ message: 'Erro ao salvar imagens' });
  }
};



exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.find().exec();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar as postagens.' });
  }
};


exports.concludePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.concluded = true;
    await post.save();

    const concludedPost = new ConcludedPost({
      userId: post.userId,
      description: post.description,
      location: post.location,
      image: post.image,
    });

    await concludedPost.save();

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: 'Post concluded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//listar as publicação concluindas
exports.listConcludedPosts = async (req, res) => {
  try {
    const posts = await ConcludedPost.find().exec();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar as postagens.' });
  }
};