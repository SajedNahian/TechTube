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
  }
});

module.exports = mongoose.model('Video', videoSchema);
