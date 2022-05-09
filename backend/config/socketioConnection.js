//External Dependencies import:
const socketIO = require('socket.io');

//Local Dependencies import:
const { socketRoutes } = require('../routes/socket.routes');

exports.socketIOSetup = (server) => {
    const io = socketIO(server); //Create Socket.io Server
    socketRoutes(io); //Register Socket.io Routes
};
