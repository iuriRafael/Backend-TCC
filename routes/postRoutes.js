const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/postControllers');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // A pasta onde os uploads serão salvos
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Nome do arquivo (com timestamp para evitar colisões)
      },
    });
  const upload = multer({ storage: storage });
  
  // Rota para upload de imagem com descrição e localização
  router.post('/upload', upload.single('imagem'), imageController.uploadImage);

  // Rota para listar as imagens
  router.get('/list', imageController.listImages);
  
module.exports = router;