const axios = require('axios');
const Player = require('../models/Player');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res){
    const players = await Player.find();

    return res.json(players);
  },

  async store(req, res){
    const { github_username, games, latitude, longitude } = req.body;
    
    let player = await Player.findOne({ github_username });

    if (!player) {
      const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
    
      const { name = login, avatar_url, bio } = apiRes.data;
    
      const gamesArray = parseStringAsArray(games);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    
      player = await Player.create({
        github_username,
        name,
        avatar_url,
        bio,
        games: gamesArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        gamesArray
      )

      sendMessage(sendSocketMessageTo, "new-player", player);
    }
  
    
    return res.json(player);
  }
}