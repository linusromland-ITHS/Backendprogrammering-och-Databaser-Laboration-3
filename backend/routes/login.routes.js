//External Dependencies import
const express = require('express');

//Local Dependencies import
const { passport } = require('../config/passport');
const { checkNotAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.post(
    '/',
    checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/api/user',
        failureRedirect: '/',
        failureFlash: true,
    }),
);

module.exports = router;
