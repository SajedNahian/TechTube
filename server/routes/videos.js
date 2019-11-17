const express = require('express');
const router = express.Router();

const {
  handleUpload,
  streamVideo,
  getAllVideos,
  getVideo
} = require('../controllers/videoController');

router
  .route('/')
  .post(handleUpload)
  .get(getAllVideos);

router.route('/stream/:videoId').get(streamVideo);
router.route('/:videoId').get(getVideo);
router.route('/:videoId/suggestions').get(getAllVideos);
module.exports = router;
