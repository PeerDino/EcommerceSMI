const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.Mode_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.Mode_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // wrong mongoose object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling mongoose Error
    if (err.name === "ValidationErro") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
    // Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message, 400);
    }
    // Handling JWT error
    if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid, Try again `;
      err = new ErrorHandler(message, 400);
    }
    // Handling Expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired, Try again `;
      err = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
