//External Dependencies import
const express = require('express');

//Variable declaration
const router = express.Router();

//Routes definition
router.use('/', require('./login.routes'));
router.use('/room', require('./room.routes'));
router.use('/message', require('./message.routes'));
router.use('/dice', require('./dice.routes'));

router.get('/', async (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
    });
});

module.exports = router;
