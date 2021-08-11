const Movie = require('../models/movie');
const IncorrectDataError = require('../errors/incorrect-data-err');
const NotFoundError = require('../errors/not-found-err');
const AuthorizationError = require('../errors/authorization-err');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send({ movies }))
    .catch(next);
};

module.exports.addNewMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectDataError('Переданы некорректиные данные при добавлении фильма');
      }
    })
    .catch(next);
};

module.exports.deleteSavedMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм по указанному _id не найден');
    })
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        throw new AuthorizationError('Нельзя удалить чужой фильм');
      }

      res.status(200).send('Фильм удалён');
    })
    .catch((err) => {
      if (err.message === 'Фильм по указанному _id не найден') {
        throw new NotFoundError('Фильм по указанному _id не найден');
      } else if (err.name === 'CastError') {
        throw new NotFoundError('Передан некоректный _id для удаления фильма');
      }
    })
    .catch(next);
};
