const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: String,
  location: String,
  image: String,
});
  
const Post = mongoose.model('Post', postSchema);

module.exports = Post;