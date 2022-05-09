//Import dotenv
require('dotenv').config();

//External Dependencies
const express = require('express');
const path = require('path');
const ip = require('ip');

//Variable declaration
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

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
    app.listen(port, () => {
        console.log(
            `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network: \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`,
        );
    });
})();
