const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');



dotenv.config(); // Carregue as variáveis de ambiente

const app = express();

app.use('/uploads', express.static(__dirname + '/uploads')); 

app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'iurikannemann', // Substitua com uma chave secreta segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Defina como true se estiver usando HTTPS
}));


app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});