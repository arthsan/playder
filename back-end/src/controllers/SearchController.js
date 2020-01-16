const Player = require('../models/Player');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, games } = req.query;

    const gamesArray = parseStringAsArray(games);

    const players = await Player.find({
      games: {
        $in: gamesArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ players }) 
  }
}