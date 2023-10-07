const mongoose = require('mongoose');

const concludedPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  
  description: String,
  location: String,
  image: String,
  
});

const ConcludedPost = mongoose.model('ConcludedPost', concludedPostSchema);

module.exports = ConcludedPost;