const express = require('express');
const router = express.Router();
const imageController = require('../controllers/postControllers');

  
  // Rota para upload de imagem com descrição e localização
  router.post('/upload', imageController.uploadImage);
  // Rota para listar as imagens
  router.get('/list', imageController.listPosts);
  
module.exports = router;