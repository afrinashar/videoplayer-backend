const socketIO = require('socket.io');

const setupSocket = (httpServer) => {
  const io = socketIO(httpServer);

  io.on('connection', (socket) => {
    console.log('User connected');

    // Handle socket events here

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = { setupSocket };
