const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cimol:c1i2m3o4l5@cleanmap.eiqipwt.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

module.exports = mongoose; 


