//External Dependencies import
const express = require('express');

//Variable declaration
const router = express.Router();

//Routes definition
router.use('/login', require('./login.routes'));
router.use('/register', require('./register.routes'));
router.use('/user', require('./user.routes'));

router.get('/', async (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
    });
});

module.exports = router;
