const mongoose = require('mongoose');
const { regexLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: { validator: (val) => regexLink.test(val) },
  },
  trailer: {
    type: String,
    require: true,
    validate: { validator: (val) => regexLink.test(val) },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: { validator: (val) => regexLink.test(val) },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: String,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
