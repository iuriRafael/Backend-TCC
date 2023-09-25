const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Suponha que o nome do modelo de usuário seja 'User'
  },
  
  description: String,
  location: String,
  image: String,
});
  
const Post = mongoose.model('Post', postSchema);

module.exports = Post;