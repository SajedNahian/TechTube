const User = require('../models/User');
const asyncHelper = require('../utils/asyncHelper');

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
