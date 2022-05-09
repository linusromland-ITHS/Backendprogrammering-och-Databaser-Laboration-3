//Local Dependencies import
const ChatMessageModel = require('../models/chatMessage');
const userModel = require('../models/user');
let socketIO;

exports.socketRoutes = (io) => {
    socketIO = io;

    socketIO.on('connection', (socket) => {
        socket.on('message', async (data) => {
            if (data.roomID && data.message && data.user.id) {
                const chatMessage = await ChatMessageModel.create({
                    message: data.message,
                    userId: data.user.id,
                    roomId: data.roomID,
                });

                const message = await ChatMessageModel.findOne({
                    where: { id: chatMessage.id },
                    include: [userModel],
                });
                io.emit(`messages-${data.roomID}`, message);
            }
        });
    });
};

exports.emitDiceRoll = (roomID, diceRolls) => {
    socketIO.emit(`diceRoll-${roomID}`, diceRolls);
};
