const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imagem: String,
  descricao: String,
  localizacao: String,
  dataCriacao: { type: Date, default: Date.now },
});
  
  module.exports = mongoose.model('Post', postSchema);