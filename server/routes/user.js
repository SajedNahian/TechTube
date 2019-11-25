const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  createAccount,
  loginUser,
  getMe,
  uploadProfilePicture
} = require('../controllers/userController');

router
  .route('/')
  .post(createAccount)
  .get(protect, getMe);

router.route('/profilePicture').post(protect, uploadProfilePicture);

router.route('/login').post(loginUser);

module.exports = router;
