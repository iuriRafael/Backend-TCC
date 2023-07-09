const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require("./routes");
const authRoutes = require('./auth');

const app = express();
app.use(express.json());
app.use(cors());

// Conectando-se ao MongoDB
mongoose.connect('mongodb+srv://cimol:c1i2m3o4l5@cleanmap.eiqipwt.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Erro ao conectar-se ao MongoDB:", error);
  });



// Rotas do usuário
app.use("/Usuario", userRoutes);

app.use('/usuario', authRoutes);

// Iniciando o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
