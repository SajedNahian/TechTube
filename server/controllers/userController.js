const User = require('../models/User');
const AWS = require('aws-sdk');
const asyncHelper = require('../utils/asyncHelper');
const { upload } = require('../utils/s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

module.exports.createAccount = asyncHelper(async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });
  if (user)
    return next({
      status: 400,
      message: 'A user with that username already exists'
    });
  user = new User({ ...req.body });
  await user.save();
  res.json({ jwt: user.getJWT() });
});

module.exports.loginUser = asyncHelper(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return next({
      status: 400,
      message: 'Invalid username and password combination'
    });
  }

  const passwordMatch = await user.matchPassword(password);

  if (!password || !passwordMatch) {
    return next({
      status: 400,
      message: 'Invalid username and password combination'
    });
  } else {
    return res.json({ jwt: user.getJWT() });
  }
});

module.exports.getMe = (req, res, next) => {
  return res.json({ user: req.user });
};

module.exports.uploadProfilePicture = asyncHelper(async (req, res, next) => {
  if (req.files === null) {
    return next({ status: 400, message: 'File is required' });
  }

  const file = req.files.file;

  if (file.mimetype !== 'image/png') {
    return next({
      status: 400,
      message: 'Must upload .png file'
    });
  }
  const randomNum = Math.random();
  req.user.profilePicture = `/api/profilePicture/${req.user.username}${randomNum}.png`;
  await req.user.save();
  upload(s3, file.data, `${req.user.username}${randomNum}.png`, () => {
    res.json({ success: true });
  });
});
