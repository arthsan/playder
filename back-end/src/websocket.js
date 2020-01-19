const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];
let io;

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, games } = socket.handshake.query
    
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      games: parseStringAsArray(games)
    });
  });
};

exports.findConnections = (coordinates, games) => {
  console.log(connections.games);
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10 
      && connection.games.some(item => games.includes(item));
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};