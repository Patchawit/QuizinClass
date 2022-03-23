const express = require("express");
// const passport = require("passport");
const mongoose = require("mongoose")
const router = express.Router();
const passport = require('../auth/google/login');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.post("/login", (req, res) => {
    const data = req.body.data
    User.findOne({ googleId: data.googleId }).then((currentUser) => {
        console.log("currentUser", currentUser)
        if (currentUser) {
            // already have this user
            console.log('user is: ', currentUser);
            const payload = {
                name: currentUser.name,
                email: currentUser.email
            }
            console.log("payload", payload)
            jwt.sign(payload, "bla bla bla",
                {
                    expiresIn: "1h"
                },
                (err, token) => {

                    if (err) res.json({ message: err })
                    console.log(token)
                    // res.status(200).json({
                    //     msg:"ssssss"
                    // })
                    res.status(200).json({
                        message: "Success",
                        user: payload,
                        token: "Bearer" + token
                    })
                }


            )

            // req.session.isLoggedIn = true
            // req.session.user = currentUser
            // return req.session.save(err => {
            //     console.log(err)
            //     console.log('login success')
            //     res.status(200).json({ session: req.session })
            // })

            // return done(null, currentUser);

        } else {
            // if not, create user in our db
            console.log(data.googleId, data.first_name)
            new User({
                _id: new mongoose.Types.ObjectId(),
                googleId: data.googleId,
                name: data.first_name + " " + data.last_name,
                email: data.email
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                const payload = {
                    name: newUser.name,
                    email: newUser.email
                }
                console.log("payload", payload)
                jwt.sign(payload, "bla bla bla", {
                    expiresIn: "1h"
                },
                    (err, token) => {
                        if (err) return res.json({ message: err })
                        return res.json({
                            message: "Success",
                            user: payload,
                            token: "Bearer" + token
                        })
                    }


                )

                // return done(null, newUser);
                // req.session.isLoggedIn = true
                // req.session.user = newUser
                // return req.session.save(err => {
                //     console.log(err)
                //     console.log('login success')
                //     res.status(200).json({ session: req.session })
                // })


            });
        }
    })
    // passport.authenticate("google-signin", function (error, user, info) {
    //     if (error) {
    //         return res.status(500).json({
    //             message: error || "Something happend",
    //             error: error.message || "Server error",
    //         });
    //     }

    //     req.logIn(user, function (error, data) {
    //         if (error) {
    //             return res.status(500).json({
    //                 message: error || "Something happend",
    //                 error: error.message || "Server error",
    //             });
    //         }
    //     });

    //     user.isAuthenticated = true;
    //     return res.json(user);
    // })(req, res);
})

router.get('/profile', (req, res) => {
    User.findOne({ email: req.session.passport.user.email })
        .lean()
        .exec((err, user) => {
            if (err) console.log(err)
            if (user) res.status(200).send(user);
            else {
                res.status(404).send();
            }
        })
})



// const authenticated = (req, res, next) => {
// const customError = new Error('you are not logged in');
// customError.statusCode = 401;
// (!req.user) ? next(customError) : res.redirect('/google');
//     if (!req.user) {
//         res.redirect('/auth/google')
//     } else {
//         next()
//     }
// }

// router.get("/google", passport.authenticate("google", {
//     scope: ["profile", "email"],
// })
// );
///Callback route for google to redirect
// router.get("/google/redirect", passport.authenticate('google'
// , { successRedirect: "http://localhost:3000" }
// )
//     , AuthController.Login);

// router.get('/getUser', authenticated, (req, res) => {
//     console.log('getUser')
//     console.log(req.user)
//     res.send(req.user)
// })


module.exports = router;