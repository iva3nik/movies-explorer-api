require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const AuthorizationError = require('../errors/authorization-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
