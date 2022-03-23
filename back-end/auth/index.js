const passport = require("passport");
const User = require("../models/user");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (email, done) {
    User.findOne({ email }).exec((err, user) => {
        done(err, user);
    });
});

const GoogleLogin = require("./google/login");

passport.use("google-signin", GoogleLogin);

module.exports = passport;