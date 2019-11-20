const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  videoUUID: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: [true, 'Comment text is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

commentSchema.statics.getVideoComments = function(videoUUID) {
  return this.find({ videoUUID });
};

module.exports = mongoose.model('Comment', commentSchema);
