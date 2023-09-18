const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');

dotenv.config(); // Carregue as variáveis de ambiente

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});