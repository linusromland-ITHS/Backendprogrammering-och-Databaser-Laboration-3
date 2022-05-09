exports.socketRoutes = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', (data) => {
            console.log(data);
        });
    });
};
