const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  createAccount,
  loginUser,
  getMe
} = require('../controllers/userController');

router
  .route('/')
  .post(createAccount)
  .get(protect, getMe);

router.route('/login').post(loginUser);

module.exports = router;
