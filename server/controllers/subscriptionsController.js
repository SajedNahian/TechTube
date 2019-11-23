const Subscription = require('../models/Subscription');
const asyncHelper = require('../utils/asyncHelper');

module.exports.subscribe = asyncHelper(async (req, res, next) => {
  await Subscription.subscribe(req.user.id, req.body.to);
  res.json({ success: true });
});

module.exports.unsubsribe = asyncHelper(async (req, res, next) => {
  await Subscription.unsubsribe(req.user.id, req.body.to);
  res.json({ success: true });
});
