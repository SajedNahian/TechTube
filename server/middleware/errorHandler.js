const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(error.message);
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      errors: [err.message]
    });
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      errors: message
    });
  }
  res.status(500).json({
    success: false,
    errors: ['Something went wrong']
  });
};

module.exports = errorHandler;
