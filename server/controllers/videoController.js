const path = require('path');
const fs = require('fs');
const asyncHelper = require('../utils/asyncHelper');

const Video = require('../models/Video');

module.exports.handleUpload = asyncHelper(async (req, res, next) => {
  const { title } = req.body;

  if (req.files === null || title === null) {
    return res.status(400).json({ msg: 'File and title are both required' });
  }

  const video = new Video({ title, author: req.user.id });
  await video.save();

  const file = req.files.file;
  file.mv(
    path.join(__dirname, '../../', '/uploads/', video.uuid + '.mp4'),
    err => {
      if (err) {
        return next(err);
      }

      res.json({ success: true });
    }
  );
});

module.exports.streamVideo = (req, res) => {
  const vidPath =
    path.join(__dirname, '../', '../', '/uploads') +
    `/${req.params.videoId}.mp4`;
  const stat = fs.statSync(vidPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(vidPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(200, head);
    fs.createReadStream(vidPath).pipe(res);
  }
};

module.exports.getAllVideos = async (req, res) => {
  const videos = await Video.find();
  res.json({ videos });
};

module.exports.getVideo = asyncHelper(async (req, res, next) => {
  const { videoId: uuid } = req.params;
  const video = await Video.findOne({ uuid }).populate(
    'author',
    'username subscribers profilePicture'
  );
  if (video) {
    video.views += 1;
    video.save();
    res.json({ video });
  } else {
    res.status(404).json({ video: null });
  }
});
