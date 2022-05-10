//External Dependencies import
const express = require('express');

//Local Dependencies import
const diceRollModel = require('../models/diceRoll');
const userModel = require('../models/user');
const { calculateDiceTopList } = require('../dice');
const { emitDiceRoll } = require('./socket.routes');
const { checkAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.get('/', checkAuthenticated, async (req, res) => {
    const diceRolls = await diceRollModel.findAll({
        where: {
            roomId: req.query.roomID,
        },
        include: [userModel],
    });
    res.json({
        success: true,
        data: diceRolls,
    });
});

router.get('/:roomID/toplist', checkAuthenticated, async (req, res) => {
    const diceRolls = await diceRollModel.findAll({
        where: {
            roomId: req.params.roomID,
        },
        include: [userModel],
    });

    res.json({
        success: true,
        data: calculateDiceTopList(diceRolls),
    });
});

router.post('/', checkAuthenticated, async (req, res) => {
    const diceValue = Math.floor(Math.random() * 6) + 1;

    const diceRoll = await diceRollModel.create({
        value: diceValue,
        userId: await req.user.id,
        roomId: req.body.roomID,
    });

    const dice = await diceRollModel.findOne({
        where: { id: diceRoll.id },
        include: [userModel],
    });

    const diceRolls = await diceRollModel.findAll({
        where: {
            roomId: req.body.roomID,
        },
        include: [userModel],
    });

    emitDiceRoll(req.body.roomID, calculateDiceTopList(diceRolls));

    res.json({
        success: true,
        data: dice,
    });
});

module.exports = router;
