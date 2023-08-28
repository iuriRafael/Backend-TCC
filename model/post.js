const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    nome: String,
    image: String,
    description: String,
    address: String,
    time: String,
    references: String
});
  
module.exports = mongoose.model('posters', PostSchema);