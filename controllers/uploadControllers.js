// controllers/uploadControllers.js
exports.uploadImagem = async (req, res) => {
    try {
      // Verifica se existe um arquivo na requisição
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }
  
      const imagemUrl = req.file.path; // O caminho do arquivo de imagem após o upload
  
      res.json({ message: 'Upload de imagem bem-sucedido', imageUrl: imagemUrl });
    } catch (error) {
      console.error('Erro ao fazer upload de imagem:', error);
      res.status(500).json({ error: 'Erro ao fazer upload de imagem' });
    }
  };
  