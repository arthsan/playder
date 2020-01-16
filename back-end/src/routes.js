const { Router } = require('express');

const PlayerController = require('./controllers/PlayerController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/players', PlayerController.index);
routes.post('/players', PlayerController.store);

routes.get('/search', SearchController.index);

module.exports = routes;