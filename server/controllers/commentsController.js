const Comment = require('../models/Comment');
const asyncHelper = require('../utils/asyncHelper');

module.exports.getComments = asyncHelper(async (req, res, next) => {
  const comments = await Comment.getVideoComments(req.params.videoId)
    .populate('user', 'username profilePicture')
    .sort({ date: 'desc' });
  res.json({ comments });
});

module.exports.postComment = asyncHelper(async (req, res, next) => {
  const comment = new Comment({
    videoUUID: req.params.videoId,
    text: req.body.text,
    user: req.user.id
  });

  await comment.save();

  res.json({ comment });
});
