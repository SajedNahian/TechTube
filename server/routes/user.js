const express = require('express');
const router = express.Router();

const { createAccount, loginUser } = require('../controllers/userController');

router.route('/').post(createAccount);

router.route('/login').post(loginUser);

module.exports = router;
