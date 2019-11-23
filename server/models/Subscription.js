const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

subscriptionSchema.statics.subscribe = async function(from, to) {
  let subscription = await this.findOne({ from, to });

  if (subscription) {
    return;
  } else {
    await this({ from, to }).save();
  }
};

subscriptionSchema.statics.unsubsribe = async function(from, to) {
  await this.deleteOne({ from, to });
};

subscriptionSchema.statics.getSubCount = async function(userId) {
  return await this.find({ to: userId }).countDocuments();
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
