const err = (err, req, res, next) => {
    const errorCode = err.status || 500;
    const errorMessage = err.message || "Error Occured!";
    return res.status(errorCode).json({
      success: false,
      message: errorMessage,
      code: errorCode,
      stack: err.stack
    })
  }

  module.exports = err;