const mongoose = require('mongoose');

const concludedPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  email: { // Adicione o campo de email aqui
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
  
});

const ConcludedPost = mongoose.model('ConcludedPost', concludedPostSchema);

module.exports = ConcludedPost;