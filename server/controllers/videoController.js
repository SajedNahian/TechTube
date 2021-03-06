const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const asyncHelper = require('../utils/asyncHelper');
const ffmpeg = require('fluent-ffmpeg');

const Video = require('../models/Video');
const Subscription = require('../models/Subscription');
const Rate = require('../models/Rate');

const { upload } = require('../utils/s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const generateThumbnails = (videoUUID, next, callback) => {
  ffmpeg(path.join(__dirname, '../../', '/uploads/', videoUUID + '.mp4'))
    .on('error', err => {
      next(err);
    })
    .on('end', () => {
      fs.unlink(
        path.join(__dirname, '../../', '/uploads/', videoUUID + '.mp4'),
        () => callback()
      );
    })
    .screenshots({
      count: 1,
      filename: `${videoUUID}.png`,
      folder: path.join(__dirname, '../../', '/thumbnails')
    });
};

module.exports.handleUpload = asyncHelper(async (req, res, next) => {
  const { title, tags } = req.body;

  if (req.files === null) {
    return next({ status: 400, message: 'File is required' });
  }

  const file = req.files.file;

  if (file.mimetype !== 'video/mp4') {
    return next({
      status: 400,
      message: 'Must upload .mp4 file'
    });
  }

  if (!tags) {
    return next({
      status: 400,
      message: 'Video must have tags'
    });
  }

  const video = new Video({
    title,
    author: req.user.id,
    tags: tags
      .replace(/ /g, '')
      .toLowerCase()
      .split(',')
  });

  await video.save();
  upload(s3, file.data, video.uuid + '.mp4', () => {
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
});

module.exports.streamVideo = async (req, res) => {
  const range = req.headers.range;
  if (!range) {
    const s3File = await s3
      .getObject({
        Bucket: 'this-bucket-is-only-for-testing',
        Key: `${req.params.videoId}.mp4`
      })
      .createReadStream();
    s3File.pipe(res);
  } else {
    const fileSize = (
      await s3
        .headObject({
          Bucket: 'this-bucket-is-only-for-testing',
          Key: `${req.params.videoId}.mp4`
        })
        .promise()
    ).ContentLength;
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const s3File = await s3
      .getObject({
        Bucket: 'this-bucket-is-only-for-testing',
        Key: `${req.params.videoId}.mp4`,
        Range: range
      })
      .createReadStream();
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    };
    // console.log(head);
    res.writeHead(206, head);
    s3File.pipe(res);
  }
};

module.exports.getAllVideos = asyncHelper(async (req, res) => {
  if (req.query.search) {
    //is searching
    const videos = await Video.find({
      $text: { $search: req.query.search }
    }).limit(10);
    return res.json({ videos });
  }

  if (!req.user) {
    const videos = await Video.find({
      uuid: { $ne: req.params.videoId }
    }).limit(12);
    return res.json({ videos });
  } else {
    const subscriptions = (await Subscription.find({ from: req.user.id })).map(
      subscription => subscription.to
    );
    const videos = await Video.find({
      $or: [{ author: { $in: subscriptions } }, {}]
    })
      .sort('-views')
      .limit(12);
    return res.json({ videos });
  }
});

module.exports.getVideo = asyncHelper(async (req, res, next) => {
  const { videoId: uuid } = req.params;
  const video = await Video.findOne({ uuid }).populate(
    'author',
    'username profilePicture'
  );

  if (video) {
    res.json(await video.getFullInfo(req.user));
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
  const video = await Video.findOne({ uuid: req.params.videoId });

  if (!req.user) {
    const videos = await Video.find({
      $or: [
        {
          tags: { $in: video.tags }
        }
      ],
      $text: { $search: video.title },
      uuid: { $ne: req.params.videoId }
    }).limit(4);
    return res.json({ videos });
  } else {
    const subscriptions = (await Subscription.find({ from: req.user.id })).map(
      subscription => subscription.to
    );

    const videos = await Video.find({
      $or: [
        {
          tags: { $in: video.tags }
        },
        { author: { $in: subscriptions } }
      ],
      $text: { $search: video.title },
      uuid: { $ne: req.params.videoId }
    }).limit(4);

    return res.json({ videos });
  }
});
