exports.Login = (req, res, next) => {
    res.status(200).json(req.user)
    // console.log(req)
    // user = req.user
    // sessionID = req.sessionID
    // res.status(200).json({
    //     sessionID: sessionID,
    //     user: user
    // })
}