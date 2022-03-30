const e = require('express')
const { findOneAndDelete } = require('../models/Question')
const Question = require('../models/Question')
const SetOfQuestion = require('../models/SetOfQuestion')
const SubjectCategory = require('../models/SubjectCategory')
const User = require('../models/User')

//สร้างวิชา
exports.getCategory = async (req, res, next) => {
    const userEmail = req.params.Email;
    const createby = await User.findOne({'email': userEmail })
    SubjectCategory.find({'createby': createby }).then(result => {
        res.status(200).json({
            allSubject: result
        })
    }).catch(error => console.log(error))

}
exports.postCategory = async (req, res, next) => {
    const { messages, email } = req.body 
    const createby = await User.findOne({'email': email})
    console.log('user', createby)
    const NewSubject = new SubjectCategory({
        subjecttitle: messages, 
        createby : createby
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


exports.getSetOfQuestionbyUser = async (req, res, next) => {
    const userEmail = req.params.Email;
    const catagory = req.params.catagory;
    // const user = req.body.user;
    // console.log(user)
    console.log(catagory)
    const createby = await User.findOne({'email':userEmail})
    try {
        const setOfquestion = await SetOfQuestion.find({ createby: createby })
        const filtersoq = setOfquestion.filter(question => {
            console.log(question.subject)
            return question.subject.toString() === catagory
        })
        console.log(filtersoq)
        
        res.status(200).json({
            msg: "setOfquestion by User",
            SetOfQuestion: filtersoq
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.getSetOfQuestionbyId = async (req, res, next) => {
    const SetOfQuestionId = req.params.SetOfQuestionId;
    console.log(SetOfQuestionId)
    try{
        const setOfQuestion = await SetOfQuestion.findById(SetOfQuestionId).populate(['questions','subject'])

        console.log(setOfQuestion)
        res.status(200).json({
            msg: "Edit question",
            setOfQuestion: setOfQuestion
        })
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    
}


exports.postSetOfQuestion = async (req, res, next) => {
    const { SetOfQuestionTitle,user } = req.body;
    console.log(user)
    const createby = await User.findOne({'email': user.email})
    console.log(createby)
    const newSetOfQuestion = new SetOfQuestion({
        soqtitle: SetOfQuestionTitle, createby: createby
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
        }),
        ans: questionData.ans
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

}

exports.patchQuestion = async (req, res, next) => {
    const { questionData } = req.body;
    try {
        let editQuestion = await Question.findById(questionData.QuestionId);
        editQuestion.questionstitle = questionData.QuestionTitle;
        editQuestion.choices[0].choiceTitle = questionData.Choice[0].choiceTitle;
        editQuestion.choices[1].choiceTitle = questionData.Choice[1].choiceTitle;
        editQuestion.choices[2].choiceTitle = questionData.Choice[2].choiceTitle;
        editQuestion.choices[3].choiceTitle = questionData.Choice[3].choiceTitle;
        editQuestion.ans = questionData.ans;
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
}

exports.deleteQuestion = async (req, res, next) => {
    const { questionData } = req.body;
    try {
        await Question.findOneAndDelete({ _id: questionData.QuestionId })
        const setofQuestion = await SetOfQuestion.findById(questionData.soqId).populate('questions')
        // console.log(setofQuestion)
        res.status(200).json({
            Question: setofQuestion
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteSetOfQuestion = async (req, res, next) => {
    const soqId = req.params.SetOfQuestionId;
    try {
        await SetOfQuestion.findOneAndDelete({ _id: soqId })
        res.status(200).json({
            msg: "Delete complete!",
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

