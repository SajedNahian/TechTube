const mongoose = require('mongoose');
const Rate = require('./Rate');
const Subscription = require('./Subscription');
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
  },
  tags: {
    type: [String],
    required: [true, 'Video must have tags']
  }
});

videoSchema.methods.getFullInfo = async function(user) {
  const likes = await Rate.find({
    onModel: 'Video',
    value: 1,
    object: this._id
  }).countDocuments();

  const dislikes = await Rate.find({
    onModel: 'Video',
    value: -1,
    object: this._id
  }).countDocuments();

  const videoObject = this.toObject();

  videoObject.author.subscribers = await Subscription.getSubCount(
    this.author._id
  );

  let userRate = user
    ? await Rate.findOne({
        onModel: 'Video',
        object: this._id,
        user: user.id
      })
    : null;

  videoObject.author.subscribed = user
    ? (await Subscription.findOne({
        from: user.id,
        to: videoObject.author._id
      })) != null
    : false;

  this.views += 1;
  this.save();

  return {
    video: {
      ...videoObject,
      likes,
      dislikes,
      userRate: userRate ? userRate.value : 0
    }
  };
};

videoSchema.index({ title: 'text' });

module.exports = mongoose.model('Video', videoSchema);
