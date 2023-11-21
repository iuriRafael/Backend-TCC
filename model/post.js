const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  email: { 
    type: String,
    required: true
  },
  description: String,
  location: {
    type: {
      type: String,
      enum: ['Point'], 
    },
    coordinates: [Number], 
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now // Define a data atual como padrão
  }
});

postSchema.index({ location: '2dsphere' });
  
const Post = mongoose.model('Post', postSchema);

module.exports = Post;