const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');
const {
  getComments,
  postComment
} = require('../controllers/commentsController');

router
  .route('/')
  .get(getComments)
  .post(protect, postComment);

module.exports = router;
