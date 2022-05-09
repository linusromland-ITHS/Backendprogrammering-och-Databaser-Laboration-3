//External Dependencies import
const express = require('express');

//Local Dependencies import
const chatMessageModel = require('../models/chatMessage');
const userModel = require('../models/user');
const { checkAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.get('/', checkAuthenticated, async (req, res) => {
    const id = req.query.roomID;
    if (id) {
        const messages = await chatMessageModel.findAll({
            where: { roomId: id },
            include: [userModel],
        });
        if (messages) {
            res.json({
                success: true,
                messages,
            });
        } else {
            res.json({
                success: false,
                error: 'No messages found',
            });
        }
    }
});

module.exports = router;
