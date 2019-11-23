const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  subscribe,
  unsubsribe
} = require('../controllers/subscriptionsController');

router
  .route('/')
  .post(protect, subscribe)
  .delete(protect, unsubsribe);

module.exports = router;
