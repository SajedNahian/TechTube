const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      error: [err.message]
    });
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: message
    });
  }
  res.status(500).json({
    success: false,
    error: ['Something went wrong']
  });
};

module.exports = errorHandler;
