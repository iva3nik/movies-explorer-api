const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { ValidationLinkMethod } = require('../utils/constants');

const {
  getSavedMovies,
  addNewMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3),
    director: Joi.string().required().min(2),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom(ValidationLinkMethod),
    trailer: Joi.string().custom(ValidationLinkMethod).required(),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().required().min(1),
    thumbnail: Joi.string().required().custom(ValidationLinkMethod),
    movieId: Joi.string().required().min(1),
  }),
}), addNewMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteSavedMovie);

module.exports = router;
