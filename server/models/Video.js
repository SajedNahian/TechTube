const mongoose = require('mongoose');
const shortid = require('shortid');

const videoSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: [true, 'A uuid is required'],
    default: shortid.generate
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author attribute is required']
  },
  datePosted: {
    type: Date,
    required: [true, 'Video must have date posted'],
    default: Date.now
  }
});

module.exports = mongoose.model('Video', videoSchema);
