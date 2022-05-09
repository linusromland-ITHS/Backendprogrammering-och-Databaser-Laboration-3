//External Dependencies import
const express = require('express');

//Local Dependencies import
const userModel = require('../models/user');
const { passport } = require('../config/passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/api/user',
        failureRedirect: '/api/user',
        failureFlash: true,
    }),
);

//Register post route
router.post('/register', checkNotAuthenticated, async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required',
        });
    }

    try {
        const userExists = await userModel.findOne({
            where: {
                username,
            },
        });
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'Username already exists',
            });
        }

        const userEmailExists = await userModel.findOne({
            where: {
                email,
            },
        });
        if (userEmailExists) {
            return res.status(400).json({
                success: false,
                error: 'Email already exists',
            });
        }

        await userModel.create({
            username,
            email,
            password,
        });
        return res.json({
            success: true,
            message: 'User created successfully',
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

router.get('/user', (req, res) => {
    const user = req.user;
    if (user) {
        res.json({
            success: true,
            user: user,
        });
    } else {
        res.json({
            success: false,
            user: null,
        });
    }
});

router.get('/logout', checkAuthenticated, (req, res) => {
    //removes your session token and logs you out.
    req.logOut();
    res.json({
        success: true,
        message: 'Logged out successfully',
    });
});

module.exports = router;
