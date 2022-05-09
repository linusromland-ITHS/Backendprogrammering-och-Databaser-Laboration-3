//External Dependencies import
const express = require('express');

//Local Dependencies import
const roomModel = require('../models/room');
const { checkAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.get('/', checkAuthenticated, async (req, res) => {
    const rooms = await roomModel.findAll();
    if (rooms) {
        res.json({
            success: true,
            rooms,
        });
    } else {
        res.json({
            success: false,
            error: 'No rooms found',
        });
    }
});

router.post('/', checkAuthenticated, async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required',
        });
    }
    try {
        await roomModel.create({
            name,
            ownerId: req.user.id,
        });
        res.json({
            success: true,
            message: 'Room created successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
