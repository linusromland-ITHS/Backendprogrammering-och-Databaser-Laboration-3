//External Dependencies import
const express = require('express');

//Local Dependencies import
const userModel = require('../models/user');
const { checkNotAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

//Register post route
router.post('/', checkNotAuthenticated, async (req, res) => {
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

module.exports = router;
