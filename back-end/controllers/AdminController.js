const Question = require('../models/Question')
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

exports.getSetOfQuestions = (req, res, next) => {
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


exports.getSetOfQuestionbySubject = async (req, res, next) => {
    const subjectId = req.params.subjectId;
    console.log(subjectId)
    try {
        const setOfquestion = await SetOfQuestion.find({ subject: subjectId })
        res.status(200).json({
            msg: "setOfquestion by Subject",
            SetOfQuestion: setOfquestion
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.postSetOfQuestion = async (req, res, next) => {
    const { SetOfQuestionTitle } = req.body;
    const newSetOfQuestion = new SetOfQuestion({
        soqtitle: SetOfQuestionTitle
    })
    try {
        await newSetOfQuestion.save();
        console.log(newSetOfQuestion)
        res.status(200).json({
            msg: "Create New SetOfQuestion Complete!",
            SetOfQuestion: newSetOfQuestion
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.patchSetOfQuestion = async (req, res, next) => {
    const { subjectId, soq } = req.body;
    try {
        const subject = await SubjectCategory.findById(subjectId);
        const setOfQuestion = await SetOfQuestion.findById(soq._id);
        setOfQuestion.subject = subject;
        await setOfQuestion.save();
        res.status(200).json({
            msg: "Add subject to SetOfQuestion Complete!",
            SetOfQuestion: setOfQuestion
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}

exports.postQuestion = async (req, res, next) => {
    const { questionData, soqId } = req.body;
    const newQuestion = new Question({
        questionstitle: questionData.QuestionTitle,
        choices: questionData?.Choice.map(choice => {
            return choice;
        })
    })
    try {
        await newQuestion.save();
        let setOfQuestion = await SetOfQuestion.findById(soqId);
        await setOfQuestion.questions.push(newQuestion);
        setOfQuestion = await setOfQuestion.populate('questions')
        await setOfQuestion.save();
        res.status(200).json({
            Question: setOfQuestion
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }



    // old postQuestion code
    // newQuestion.save()
    //     .then(question => {
    //         return question
    //     })
    //     .then(result => {

    //         SetOfQuestion
    //             .findById(soqId)
    //             .populate('questions')
    //             .then(SetOfQuestion => {
    //                 SetOfQuestion.questions.push(result._id)
    //                 // console.log(SetOfQuestion.questions)
    //                 return SetOfQuestion.save().then(result => {
    //                     return result.populate('questions')
    //                 })
    //             })
    //             .then(newSetOfQuestion => {
    //                 console.log(newSetOfQuestion)
    //                 res.status(200).json({
    //                     Question: newSetOfQuestion
    //                 })

    //             })
    //             .catch(err => console.log(err))
    //     })
    //     .catch(err => console.log(err))


}

exports.patchQuestion = async (req, res, next) => {
    const { questionData } = req.body;
    // console.log(questionData.Choice[0].choiceTitle)
    // console.log(questionData.Choice[1].choiceTitle)
    // console.log(questionData.Choice[2].choiceTitle)
    // console.log(questionData.Choice[3].choiceTitle)
    try {
        let editQuestion = await Question.findById(questionData.QuestionId)
        editQuestion.questionstitle = questionData.QuestionTitle
        // console.log(editQuestion.choices[0].choiceTitle)
        // console.log(editQuestion.choices[1].choiceTitle)
        // console.log(editQuestion.choices[2].choiceTitle)
        // console.log(editQuestion.choices[3].choiceTitle)
        editQuestion.choices[0].choiceTitle = questionData.Choice[0].choiceTitle
        editQuestion.choices[1].choiceTitle = questionData.Choice[1].choiceTitle
        editQuestion.choices[2].choiceTitle = questionData.Choice[2].choiceTitle
        editQuestion.choices[3].choiceTitle = questionData.Choice[3].choiceTitle
        await editQuestion.save()
        const setofQuestion = await SetOfQuestion.findById(questionData.soqId).populate('questions')
        console.log(setofQuestion)
        res.status(200).json({
            Question: setofQuestion
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


    // console.log(questionData)
}

