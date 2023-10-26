const AppErr = (message, statusCode) => {
  let error = new Error(message);
  error.status = "failed";
  error.stack = error.stack;
  error.statusCode = statusCode ? statusCode : 500;
  return error;
};

module.exports = AppErr;
