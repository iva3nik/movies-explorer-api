const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const  { PORT = 3000 } = process.env;
const app = express();

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
    // eslint-disable-next-line no-console
    console.error(`Init application error: ${error}`);
  }
}




app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});