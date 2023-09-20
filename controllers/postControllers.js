const Post = require('../model/post');
const fs = require('fs');
const path = require('path');

// Função para fazer upload de imagem com descrição e localização
exports.uploadImage = async (req, res) => {
  try {
    const imageInfos = [];

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