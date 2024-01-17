const createError = (status, message,success) => {
  const err = new Error();
  //err.status = status;
  err.message = message;
  return { message, status,success };
};

module.exports = createError;
