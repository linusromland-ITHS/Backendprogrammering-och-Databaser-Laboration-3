//External Dependencies import
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

//Local Dependencies import
const userModel = require('../models/user');

function initializePassport() {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            //Find user by email
            const user = await userModel.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isValid = user.password === password;
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }),
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findByPk(id);
        done(null, user);
    });
}

module.exports = { initializePassport, passport };
