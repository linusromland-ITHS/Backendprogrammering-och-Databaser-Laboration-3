//External Dependencies import
const express = require('express');

//Local Dependencies import
const diceRollModel = require('../models/diceRoll');
const userModel = require('../models/user');
const { calculateDiceTopList } = require('../dice');
const { checkAuthenticated } = require('../config/auth');

//Variable declaration
const router = express.Router();

router.get('/:roomId', checkAuthenticated, async (req, res) => {
    const diceRolls = await diceRollModel.findAll({
        where: {
            roomId: req.params.roomId,
        },
        include: [userModel],
    });
    res.json({
        success: true,
        data: diceRolls,
    });
});

router.get('/:roomId/toplist', checkAuthenticated, async (req, res) => {
    const diceRolls = await diceRollModel.findAll({
        where: {
            roomId: req.params.roomId,
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
    res.json({
        success: true,
        data: dice,
    });
});

module.exports = router;
