const handleErrors = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({ 
    "custom error data from handleErrors data :": data, 
    "custom error message from handleErrors message :" : message 
  });
};

module.exports = handleErrors;

