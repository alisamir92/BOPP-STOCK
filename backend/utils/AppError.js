class AppError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
    //   this.message = message;

    }
  }


  module.exports = AppError