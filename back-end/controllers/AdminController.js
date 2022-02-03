const SetOfQuestion = require('../models/SetOfQuestion')
const SubjectCategory = require('../models/SubjectCategory')
//สร้างวิชา
exports.getCategory = (req, res, next) => {
    SubjectCategory.find().then(result => {
        res.status(200).json({
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
            res.status(200).json({
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


// exports.getSetQuestion = (req, res, next) => {
//     SetOfQuestion.find().then(result => {
//         res.status('200').json({
//             allSetQuestion: result
//         })
//     }).catch(error => console.log(error))

// }

exports.getSetOfQuestion = (req, res, next) => {
    SetOfQuestion
        .find()
        .populate('subject')
        .then(result => {
            return res.status(200).json({
                allSoq: result
            })
        })
        .catch(err => console.log(err))

}

exports.postSetOfQuestion = (req, res, next) => {
    const { SetOfQuestionTitle } = req.body;
    const newSetOfQuestion = new SetOfQuestion({
        soqtitle: SetOfQuestionTitle
    })
    newSetOfQuestion
        .save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                msg: "Create New SetOfQuestion Complete!",
                SetOfQuestion: result
            })
        })
        .catch(err => console.log(err))
}

exports.patchSetOfQuestion = (req, res, next) => {
    const { subjectId, soq } = req.body;
    console.log(soq)
    SubjectCategory
        .findById(subjectId)
        .then(SubjectCategory => {
            SetOfQuestion
                .findById(soq._id)
                .then(Soq => {
                    console.log("in subcategory", SubjectCategory)
                    Soq.subject = SubjectCategory._id
                    return Soq
                        .save()
                        .then(result => {
                            console.log("aaaaaaaa", typeof result.subject)
                            res.status(200).json({
                                msg: "Patch subjectId Complete!",
                                SetOfQuestion: result
                            })
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))



}

