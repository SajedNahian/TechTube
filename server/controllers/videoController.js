const path = require('path');
const fs = require('fs');
const asyncHelper = require('../utils/asyncHelper');
const ffmpeg = require('fluent-ffmpeg');

const Video = require('../models/Video');
const Rate = require('../models/Rate');

const generateThumbnails = (videoUUID, next, callback) => {
  ffmpeg(path.join(__dirname, '../../', '/uploads/', videoUUID + '.mp4'))
    .on('error', err => {
      next(err);
    })
    .on('end', () => {
      callback();
    })
    .screenshots({
      count: 1,
      filename: `${videoUUID}.png`,
      folder: path.join(__dirname, '../../', '/thumbnails')
    });
};

module.exports.handleUpload = asyncHelper(async (req, res, next) => {
  const { title } = req.body;

  if (req.files === null || title === null) {
    return next({ status: 400, message: 'File and title are both required' });
  }

  const file = req.files.file;

  if (file.mimetype !== 'video/mp4') {
    return next({
      status: 400,
      message: 'Must upload .mp4 file'
    });
  }

  const video = new Video({ title, author: req.user.id });
  await video.save();

  file.mv(
    path.join(__dirname, '../../', '/uploads/', video.uuid + '.mp4'),
    err => {
      if (err) {
        return next(err);
      }
    }
  );

  generateThumbnails(video.uuid, next, () => res.json({ success: true }));
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

    const likes = await Rate.find({
      onModel: 'Video',
      value: 1,
      object: video.id
    }).countDocuments();

    const dislikes = await Rate.find({
      onModel: 'Video',
      value: -1,
      object: video.id
    }).countDocuments();

    let userRate = req.user
      ? await Rate.findOne({
          onModel: 'Video',
          object: video.id,
          user: req.user.id
        })
      : null;

    res.json({
      video: {
        ...video.toObject(),
        likes,
        dislikes,
        userRate: userRate ? userRate.value : 0
      }
    });
  } else {
    next({ status: 404, message: 'That video was not found on our server' });
  }
});

module.exports.rateVideo = asyncHelper(async (req, res, next) => {
  const video = await Video.findOne({ uuid: req.params.videoId });

  if (!video) return next({ status: 400, message: 'Video does not exist' });
  let rate = await Rate.findOne({
    onModel: 'Video',
    user: req.user.id,
    object: video.id
  });

  if (rate) {
    // Updating the rating
    rate.value = req.body.value;
  } else {
    // Creating a new rating
    rate = new Rate({
      onModel: 'Video',
      user: req.user.id,
      object: video.id,
      value: req.body.value
    });
  }

  await rate.save();
  return res.json({ success: true });
});

module.exports.getSuggestions = asyncHelper(async (req, res, next) => {
  const videos = await Video.find({ uuid: { $ne: req.params.videoId } }).limit(
    4
  );
  res.json({ videos });
});
