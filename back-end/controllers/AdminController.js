const SubjectCategory = require('../models/SubjectCategory')

exports.getCategory = (req, res, next) => {
    res.status('200').json({
        messages: 'quiz in class'
    })
}
exports.postCategory = (req, res, next) => {
    const { messages } = req.body
    const NewSubject = new SubjectCategory({
        subjecttitle: messages
    })
    SubjectCategory.save()
        .then(result => {
            return console.log(result)
        })
        .then(result => {
            res.status('200').json({
                messages: 'create New Subject Success '
            })
        })
        .catch(error => console.log(error))
}