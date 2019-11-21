const express = require('express');
const { protect, optionalProtect } = require('../middleware/auth');
const router = express.Router();

const {
  handleUpload,
  streamVideo,
  getAllVideos,
  getVideo,
  getSuggestions,
  rateVideo
} = require('../controllers/videoController');

router
  .route('/')
  .post(protect, handleUpload)
  .get(getAllVideos);

router.route('/stream/:videoId').get(streamVideo);
router.use('/:videoId/comments', require('./comments'));
router.route('/:videoId/rate').post(protect, rateVideo);
router.route('/:videoId').get(optionalProtect, getVideo);
router.route('/:videoId/suggestions').get(getSuggestions);
module.exports = router;
