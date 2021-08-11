const regexLink = /https?:\/\/[\w{1,s}\W{1,s}]#?/;
const validator = require('validator');

const MONGOOSE_URL = 'mongodb://localhost:27017/bitfilmsdb';

const allowedCors = [
  'https://iva3diploma.nomoredomains.club',
  'http://iva3diploma.nomoredomains.club',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

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
  DEFAULT_ALLOWED_METHODS,
  allowedCors,
  MONGOOSE_URL,
};
