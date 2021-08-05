const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { ValidationLinkMethod } = require('../utils/constants');

const {
  getInfoAboutUser,
  updateDataUser,
} = require('../controllers/users');

router.get('/me', getInfoAboutUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().custom(ValidationLinkMethod),
  }),
}), updateDataUser);

module.exports = router;