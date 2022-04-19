const jwt = require('jsonwebtoken')
const User = require('../models/User')


module.exports = async function (req, res, next) {
    //get token from header
    const token = req.header('Authcookie')
    console.log("token",token)
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token' })
    }
    // Verify token
    try {
        const decoded = jwt.verify(token, 'bla bla bla')
        req.user = decoded.email
        const loggedinUser = await User.findOne({"email": req.user})
        if (loggedinUser.usertype === 'Teacher'){
            console.log(req.user)
            next()
        }
        else {
            throw new Error("You must be a teacher.")
        }
        
    } catch (err) {
        console.log(err)
        res.status(401).json({ msg: "authen fail" })
    }
}