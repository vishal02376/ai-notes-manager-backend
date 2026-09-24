const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  
  let statusCode = res.statusCode;

  if (!statusCode || statusCode === 200) {
    statusCode = 500;
  }

  let message = err.message;
  if (!message) {
    message = "Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = { notFound, errorHandler };
