
const handleError = (err, res) => {

const statusCode = err.statusCode || 500;
const message = err.message;

if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
        status: "error",
        statusCode,
        err,
        message
    });
  } else if (process.env.NODE_ENV === 'production') {

    if (err.isOperational) {
        res.status(statusCode).json({
            status: "error",
            message
        });
    
        // Programming or other unknown error: don't leak error details
      } else {
        // 1) Log error
        console.error('ERROR 💥', err);
    
        // 2) Send generic message
        res.status(500).json({
          status: 'error',
          message: 'Something went very wrong!'
        });
      }
      
  }
};



module.exports = handleError