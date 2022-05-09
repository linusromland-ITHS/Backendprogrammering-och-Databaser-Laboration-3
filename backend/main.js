//Import dotenv
require('dotenv').config();

//External Dependencies
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const ip = require('ip');

//Internal Dependencies
const { connectToMySQL, sequelize } = require('./config/mysqlConnection.js');
const { initializePassport, passport } = require('./config/passport.js');

//Variable declaration
const app = express();
const port = process.env.PORT || 3000;

//Models import
const chatMessageModel = require('./models/chatMessage');
const diceRollModel = require('./models/diceRoll');
const roomModel = require('./models/room');
const userModel = require('./models/user');

//Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

//Middleware
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((err, _req, res, _next) => {
    res.status(400).json({
        success: false,
        error: err.message,
    });
});

//Routes
app.use('/api', require('./routes/api.js'));

//Serve static files from the Vue app
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

(async () => {
    //Establish connection to MySQL
    connectToMySQL();

    //Validate connection
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');

    //Establish relations between models
    chatMessageModel.belongsTo(userModel, {
        foreignKey: 'userId',
    });
    diceRollModel.belongsTo(userModel, {
        foreignKey: 'userId',
    });
    roomModel.hasMany(chatMessageModel, {
        foreignKey: 'roomId',
    });
    roomModel.hasMany(diceRollModel, {
        foreignKey: 'roomId',
    });
    roomModel.belongsTo(userModel, {
        foreignKey: 'ownerId',
    });
    userModel.hasMany(chatMessageModel, {
        foreignKey: 'userId',
    });
    userModel.hasMany(diceRollModel, {
        foreignKey: 'userId',
    });

    //Sync models
    await sequelize.sync();

    //Initialize passport
    initializePassport();

    app.listen(port, () => {
        console.log(
            `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network: \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`,
        );
    });
})();
