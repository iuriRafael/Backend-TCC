const express = require('express');
const router = express.Router();
const imageController = require('../controllers/postControllers');
const Post = require('../model/post');

  //Postar a publicação
  router.post('/upload', imageController.uploadImage);

  //Listar as publicação
  router.get('/list', imageController.listPosts);

  //Listar as publicação por usuário em andamento
  router.get('/user/:userId', async (req, res) => {
    try {
      
      const userId = req.params.userId;

      const userPublications = await Post.find({ userId: userId });
  
      res.status(200).json(userPublications);
    } catch (error) {
      console.error('Erro ao buscar as publicações do usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar as publicações do usuário' });
    }
  });//iuri


  //usuário concluir publicação
  router.put('/:id/conclude', imageController.concludePost);

  //listar todas as publicações concluídas
  router.get('/listConcluded', imageController.listConcludedPosts);

  //excluir rotas
  router.delete('/:id', imageController.deletePost);

  //Listar publicação concluídas por usuário
  router.get('/concluded-posts/:userId', imageController.listConcludedPostsByUser);

module.exports = router;