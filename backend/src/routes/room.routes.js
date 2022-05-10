//External Dependencies import
const express = require('express');

//Local Dependencies import
const roomModel = require('../models/room');
const userModel = require('../models/user');
const { emitGetRoom } = require('./socket.routes');
const { checkAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.get('/', checkAuthenticated, async (req, res) => {
    const id = req.query.roomID;
    if (id) {
        const room = await roomModel.findOne({ where: { id: id } });
        if (room) return res.json({ success: true, room });
    }
    const rooms = await roomModel.findAll({ include: [userModel] });
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
        emitGetRoom();
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
