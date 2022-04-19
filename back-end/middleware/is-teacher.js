const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    //get token from header
    const token = req.header('Authcookie')
    console.log(token)
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token' })
    }
    // Verify token
    try {
        const decoded = jwt.verify(token, 'bla bla bla')
        req.user = decoded.email
        console.log(req.user)
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is notvalid' })
    }
}