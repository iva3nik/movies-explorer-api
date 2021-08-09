const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createNewUser } = require('./controllers/users');
const serverError = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-err');
const { ValidationLinkMethod } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const  { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 90000,
  max: 100,
});

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function start() {
  try {
    app.listen(PORT);
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Init application error: ${error}`);
  }
}

app.use(cors);
app.use(requestLogger);
app.use(limiter);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(ValidationLinkMethod),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }).unknown(true),
}), createNewUser);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use(errorLogger);
app.use(errors());
app.use('*', (req, res, next) => {
  next(new NotFoundError('Нет такой страницы'));
});
app.use((err, req, res, next) => serverError(err, req, res, next));

start();