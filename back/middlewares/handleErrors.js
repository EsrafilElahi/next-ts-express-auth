const handleErrors = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({ "custom error data from handleErrors" : data, "custom error message from handleErrors" : message });
};

module.exports = handleErrors;

