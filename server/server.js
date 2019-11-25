const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const AWS = require('aws-sdk');
const { get } = require('./utils/s3');
const connectDB = require('./config/db');

// Environment configuration
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(fileUpload());

const PORT = process.env.PORT || 5000;

app.use(
  '/api/thumbnails',
  express.static(path.join(__dirname, '../', 'thumbnails'))
);

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

app.route('/api/profilePicture/:fileName').get((req, res, next) => {
  get(s3, req.params.fileName, res, 'image/png');
});

app.use('/api/videos', require('./routes/videos'));
app.use('/api/user', require('./routes/user'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

// Error handling
app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
