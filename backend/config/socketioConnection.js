//External Dependencies import:
const socketIO = require('socket.io');

let io;

exports.socketIOSetup = (server) => {
    io = socketIO(server); //Create Socket.io Server
};

exports.io = io;
