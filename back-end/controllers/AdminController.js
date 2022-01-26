const SubjectCategory = require('../models/SubjectCategory')

exports.getCategory = (req, res, next) => {
    SubjectCategory.find().then(result => {
        res.status('200').json({
            allSubject: result
        })
    }).catch(error => console.log(error))
    
}
exports.postCategory = (req, res, next) => {
    const { messages } = req.body
    console.log(req.body)
    const NewSubject = new SubjectCategory({
        subjecttitle: messages
    })
    NewSubject.save()
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