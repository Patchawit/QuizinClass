const SetOfQuestion = require('../models/SetOfQuestion')
const SubjectCategory = require('../models/SubjectCategory')
//สร้างวิชา
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

exports.deleteCategory = (req, res, next) => {
    const { categoryId } = req.body
    console.log(req.body)
    SubjectCategory.deleteOne({
        _id: categoryId

    }).then(result => {
        return console.log(result)
    }).catch(error => console.log(error))

}


//สร้างชุดคำถาม


exports.getSetQuestion = (req, res, next) => {
    SetOfQuestion.find().then(result => {
        res.status('200').json({
            allSetQuestion: result
        })
    }).catch(error => console.log(error))

}
exports.postSetQuestion = (req, res, next) => {
    const { SetOfQuestion} = req.body

}

exports.deleteCategory = (req, res, next) => {
    const { categoryId } = req.body
    console.log(req.body)
    SubjectCategory.deleteOne({
        _id: categoryId

    }).then(result => {
        return console.log(result)
    }).catch(error => console.log(error))

}