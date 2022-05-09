const { sequelize } = require('../config/mysqlConnection');
const { DataTypes } = require('sequelize');

const diceRoll = sequelize.define('diceRoll', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

module.exports = diceRoll;
