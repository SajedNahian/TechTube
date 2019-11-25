module.exports.upload = (s3, fileData, fileName, cb) => {
  const params = {
    Bucket: 'this-bucket-is-only-for-testing',
    Key: fileName, // File name you want to save as in S3
    Body: fileData
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    cb();
  });
};

module.exports.get = (s3, key, res, contentType) => {
  const params = { Bucket: 'this-bucket-is-only-for-testing', Key: key };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.write(data.Body, 'binary');
    res.end(null, 'binary');
  });
};
