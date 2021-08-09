const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const AuthorizationError = require('../errors/authorization-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
