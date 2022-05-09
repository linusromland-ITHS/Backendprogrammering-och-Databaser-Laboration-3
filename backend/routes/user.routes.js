//External Dependencies import
const express = require('express');

//Variable declaration
const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
