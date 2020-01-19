const dotenv = require('./utils/dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const parser = require('body-parser');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(`mongodb+srv://${dotenv.user}:${dotenv.pass}@cluster0-csen6.mongodb.net/${dotenv.admin}?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(cors())
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

server.listen(3333);