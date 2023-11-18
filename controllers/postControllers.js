require('dotenv').config();

const Post = require('../model/post');
const fs = require('fs');
const path = require('path');
const ConcludedPost = require('../model/concludedPost');

const cloudinary = require('../config/cloudinary');
const nodemailer = require('nodemailer');



// Função para fazer upload de imagem com descrição e localização
exports.uploadImage = async (req, res) => {
  try {
    const imageInfos = [];
    const userId = req.body.userId;
    const userEmail = req.body.email;

    console.log('ID do usuário:', userId);
    console.log('Email do usuário:', userEmail);

    for (const file of req.body.files) {
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
        upload_preset: 'iurikannemann' // Substitua 'seu_upload_preset' pelo seu próprio valor
      });

      // Obtém a URL da imagem do Cloudinary
      const imageUrl = result.secure_url;

      const { description, location } = req.body;
      const locationCoordinates = location.coordinates;

      // Criar um objeto de informações da imagem
      const imageInfo = {
        image: imageUrl,
        description: description,
        location: {
          type: 'Point',
          coordinates: locationCoordinates,
        },
        userId: userId,
        email: userEmail,
      };

      imageInfos.push(imageInfo);
    }

  
    const savedImages = await Post.insertMany(imageInfos);

    console.log('Imagens salvas com sucesso no banco de dados:', savedImages);
    res.json({ message: 'Imagens salvas com sucesso no banco de dados' });
  } catch (error) {
    console.error('Erro ao salvar imagens:', error);
    res.status(500).json({ message: 'Erro ao salvar imagens' });
  }
};


//Listar publicação não concluida
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

    const userEmail = post.email; // Pegando o email associado à postagem concluída

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail, // Usando o email associado à postagem concluída
      subject: 'Avisa CLEAN MAP',
      text: 'Post concluído com sucesso!'
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro ao enviar o e-mail' });
      } else {
        console.log('Email enviado: ' + info.response);

        // Salvar a postagem concluída
        const concludedPost = new ConcludedPost({
          userId: post.userId,
          email: userEmail, 
          description: post.description,
          location: post.location,
          image: post.image
        });

        await concludedPost.save();

        // Excluir o post original
        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ message: 'Post concluído e e-mail enviado com sucesso' });
      }
    });
  } catch (error) {
    console.error('Erro ao concluir o post:', error);
    return res.status(500).json({ message: 'Erro ao concluir o post' });
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

//excluir publicação
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// listar as publicações concluídas de um usuário específico
exports.listConcludedPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('User ID:', userId);
    const posts = await ConcludedPost.find({ userId }).exec();
    console.log('Concluded Posts:', posts);

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar as postagens.' });
  }
};


// exports.sendEmail = async (req, res) => {
  
//   try {
//     const post = req.body; // Supondo que você está recebendo os dados do post
//     const userEmail = post.email; 
//     console.log('Email do usuário:', userEmail);


//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: userEmail,
//       subject: 'Avisa CLEAN MAP',
//       text: 'Post concluindo com sucesso!',
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Erro ao enviar o e-mail' });
//       } else {
//         console.log('Email enviado: ' + info.response);
//         res.status(200).json({ message: 'E-mail enviado com sucesso' });
//       }
//     });
//   } catch (error) {
//     console.error('Erro ao enviar o e-mail:', error);
//     res.status(500).json({ message: 'Erro ao enviar o e-mail' });
//   }
// };