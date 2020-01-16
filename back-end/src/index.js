const dotenv = require('./utils/dotenv');
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const routes = require('./routes');

const app = express();

mongoose.connect(`mongodb+srv://${dotenv.user}:${dotenv.pass}@cluster0-csen6.mongodb.net/${dotenv.admin}?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(3333);