const regexLink = /https?:\/\/[\w{1,s}\W{1,s}]#?/;
const validator = require('validator');

const allowedCors = [
  'https://domainmesto.nomoredomains.rocks',
  'http://domainmesto.nomoredomains.rocks',
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
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};