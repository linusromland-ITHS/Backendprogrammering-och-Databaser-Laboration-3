exports.calculateDiceTopList = (diceRolls) => {
    //Convert diceRolls to get highest value, average value, number of rolls on every user
    let diceRollsByUser = {};
    diceRolls.forEach((diceRoll) => {
        if (!diceRollsByUser[diceRoll.userId]) {
            diceRollsByUser[diceRoll.userId] = {
                highestValue: diceRoll.value,
                averageValue: diceRoll.value,
                numberOfRolls: 1,
                username: diceRoll.user.username,
            };
        } else {
            diceRollsByUser[diceRoll.userId].highestValue = Math.max(
                diceRollsByUser[diceRoll.userId].highestValue,
                diceRoll.value,
            );
            diceRollsByUser[diceRoll.userId].averageValue += diceRoll.value;
            diceRollsByUser[diceRoll.userId].numberOfRolls += 1;
        }
    });
    //Calculate average value
    Object.keys(diceRollsByUser).forEach((userId) => {
        diceRollsByUser[userId].averageValue /= diceRollsByUser[userId].numberOfRolls;
    });

    const diceRollsByUserSorted = Object.keys(diceRollsByUser)
        .map((userId) => {
            return diceRollsByUser[userId];
        })
        .sort((a, b) => {
            return b.averageValue - a.averageValue;
        });

    //Round average value to two decimals
    diceRollsByUserSorted.forEach((user) => {
        user.averageValue = Math.round(user.averageValue * 100) / 100;
    });

    return diceRollsByUserSorted;
};
