const express = require('express');
const router = express.Router();
const imageController = require('../controllers/postControllers');
const Post = require('../model/post');


  router.post('/upload', imageController.uploadImage);
  router.get('/list', imageController.listPosts);

  router.get('/user/:userId', async (req, res) => {
    try {
      
      const userId = req.params.userId;

      const userPublications = await Post.find({ userId: userId });
  
      res.status(200).json(userPublications);
    } catch (error) {
      console.error('Erro ao buscar as publicações do usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar as publicações do usuário' });
    }
  });

  router.put('/:id/conclude', imageController.concludePost);

  router.get('/listConcluded', imageController.listConcludedPosts);

  //excluir rotas
  router.delete('/:id', imageController.deletePost);

module.exports = router;