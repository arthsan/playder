import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.16:3333', {
  autoConnect: false
});

function subscribeToNewPlayers(subscribeFunction) {
  socket.on('new-player', subscribeFunction);
}

function connect(latitude, longitude, games) {
  socket.io.opts.query = {
    latitude,
    longitude,
    games
  };

  socket.connect();
};

function disconnect() {
  if (socket.disconnect) {
    socket.disconnect();
  }
};

export {
  connect,
  disconnect,
  subscribeToNewPlayers
};
