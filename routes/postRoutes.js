const express = require('express');
const router = express.Router();
const post = require('../model/post');
const postController = require('../controllers/postControllers');
const upload = require('../middlewares/uploadMiddleware');



router.post('/criar',  upload.single('imagem'), postController.Postagem);

// Rota para listar todas as postagens
router.get('/listar', postController.listarPostagens);

module.exports = router;