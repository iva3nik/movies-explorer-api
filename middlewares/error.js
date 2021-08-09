const serverError = (err, req, res, next) => {
  res.status(err.statusCode).send({
      message: err.statusCode === 500
        ? 'На сервере произошла ошибка'
        : err.message,
    });
  next();
};

module.exports = serverError;