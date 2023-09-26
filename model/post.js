const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  description: String,
  location: String,
  image: String,
});
  
const Post = mongoose.model('Post', postSchema);

module.exports = Post;