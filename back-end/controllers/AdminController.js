const { request } = require("express")

exports.getCategory = (req, res, next) => {
    res.status('200').json({
        messages: 'quiz in class'
    })
}
exports.postCategory = (req, res, next) => {
    // const {messages} = req.body
    // res.status('200').json({
    //     messages: 'quiz in class'
    // })
    console.log(req.body)
}