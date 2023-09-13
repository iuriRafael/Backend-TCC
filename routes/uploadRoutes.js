const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/uploadControllers');

const upload = require('../middlewares/uploadMiddleware');

router.post('/imagem',  upload.single('imagem'), uploadController.uploadImagem);

module.exports = router;