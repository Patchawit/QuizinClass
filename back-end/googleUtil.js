const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const mongoose = require('mongoose');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: /* your clientID*/"680137363543-qsg5innvjcd89cc81n7oku0jqljs7iqt.apps.googleusercontent.com",
        clientSecret:/*your clienSecret*/"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",
        callbackURL: 'http://localhost:3000/'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log("oooo")
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            console.log(currentUser)
            if (currentUser) {
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile._json.email
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);