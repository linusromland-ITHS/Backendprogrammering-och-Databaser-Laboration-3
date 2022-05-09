const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const chatMessage = sequelize.define('chatMessage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

module.exports = chatMessage;
