require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const serverError = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const cors = require('./middlewares/cors');
const { MONGOOSE_URL } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, MONGOOSE_URL_ENV } = process.env;
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
    await mongoose.connect(NODE_ENV === 'production' ? MONGOOSE_URL_ENV : MONGOOSE_URL, {
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

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => serverError(err, req, res, next));

start();
