const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  object: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Video', 'Comment']
  },
  value: {
    type: Number,
    required: true,
    enum: [-1, 1]
  }
});

module.exports = mongoose.model('Rate', rateSchema);
