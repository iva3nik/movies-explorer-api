const regexLink = /https?:\/\/[\w{1,s}\W{1,s}]#?/;
const validator = require('validator');
const JWT_SECRET = '5dacab97a83809a4dfb5f66ca9fc1f855e3915a4ec8b721a01b77201078c2753';

const ValidationLinkMethod = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

module.exports = {
  regexLink,
  ValidationLinkMethod,
  JWT_SECRET,
};