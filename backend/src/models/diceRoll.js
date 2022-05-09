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
});

module.exports = diceRoll;
