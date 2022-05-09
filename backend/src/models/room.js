const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const room = sequelize.define('room', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = room;
