//Checks if a user is authenticated with a valid session cookie
exports.checkAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

//Checks if a user is authenticated with a valid session cookie and then rejects them
exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};
