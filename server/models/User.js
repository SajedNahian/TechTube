const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A username is required']
  },
  profilePicture: {
    type: String,
    required: [true, 'A profile picture is required'],
    default:
      'https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg'
  },
  password: {
    type: String,
    minlength: [5, 'Password must be alteast 5 characters long'],
    required: [true, 'Password is required'],
    select: false
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (e) {
    next(); //something went wrong
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (e) {
    return false;
  }
};

userSchema.methods.getJWT = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports = mongoose.model('User', userSchema);
