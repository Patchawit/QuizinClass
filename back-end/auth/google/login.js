const Strategy = require("passport-local").Strategy;
const User = require('../../models/User');

const LoginStrategy = new Strategy(
    
    { usernameField: "email", passwordField: "googleId" },
    function (email, password, done) {
        User.findOne({ email })
            .lean()
            .exec((err, user) => {
                if (err) {
                    return done(err, null);
                }

                if (!user) {
                    return done("No user found", null);
                }

                const isPasswordValid = password === user.googleId;

                if (!isPasswordValid) {
                    return done("Google authentication failed", null);
                }

                return done(null, user);
            });
    }
);

// const LoginStrategy = new Strategy(
//     { usernameField: "email", passwordField: "googleId" }, () => {
//         User.findOne({ googleId: profile.id }).then((currentUser) => {
//             console.log(currentUser)
//             if (currentUser) {
//                 // already have this user
//                 console.log('user is: ', currentUser);
//                 return done(null, currentUser);

//             } else {
//                 // if not, create user in our db
//                 new User({
//                     _id: new mongoose.Types.ObjectId(),
//                     googleId: profile.id,
//                     name: profile.displayName,
//                     email: profile._json.email
//                 }).save().then((newUser) => {
//                     console.log('created new user: ', newUser);
//                     return done(null, newUser);

//                 });
//             }
//         }

//         )
//     });

module.exports = LoginStrategy