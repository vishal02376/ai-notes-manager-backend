const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  // Agar controller ne pehle se status set kiya hai (jaise 400 ya 404), wahi use karo.
  // Warna maan lo ye server ki taraf se galti hai, so 500 bhej do.
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
