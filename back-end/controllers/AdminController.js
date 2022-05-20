const e = require('express')
const mongoose = require('mongoose')
const { findOneAndDelete } = require('../models/Question')
const Question = require('../models/Question')
const SetOfQuestion = require('../models/SetOfQuestion')
const SubjectCategory = require('../models/SubjectCategory')
const Lobby = require('../models/Lobby')
const User = require('../models/User')
const TableScore = require('../models/TableScore')

const database = require("firebase/database");
const { db } = require("../middleware/firebase");

//สร้างวิชา
exports.getCategory = async (req, res, next) => {
    const userEmail = req.params.Email;
    const createby = await User.findOne({ 'email': userEmail })
    SubjectCategory.find({ 'createby': createby }).then(result => {
        res.status(200).json({
            allSubject: result
        })
    }).catch(error => console.log(error))

}
exports.postCategory = async (req, res, next) => {
    const { messages } = req.body
    const createby = await User.findOne({ 'email': req.user })
    console.log('user', createby)
    const NewSubject = new SubjectCategory({
        subjecttitle: messages,
        createby: createby
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
    console.log('catagory', catagory)
    const createby = await User.findOne({ 'email': userEmail })
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
    try {
        const setOfQuestion = await SetOfQuestion.findById(SetOfQuestionId).populate(['questions', 'subject'])

        console.log(setOfQuestion)
        res.status(200).json({
            msg: "Edit question",
            setOfQuestion: setOfQuestion
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.postSetOfQuestion = async (req, res, next) => {
    const { SetOfQuestionTitle, user } = req.body;
    console.log(user)
    const createby = await User.findOne({ 'email': user.email })
    console.log(createby)
    const timeElapsed = Date.now();
    let dateNow = new Date(timeElapsed);
    dateNow = dateNow.toLocaleDateString();
    const newSetOfQuestion = new SetOfQuestion({
        soqtitle: SetOfQuestionTitle, createby: createby, date: dateNow
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
    const questionDataJson = JSON.parse(questionData)
    // console.log(questionDataJson.QuestionTitle)
    const img = req.file
    let newQuestion
    if (!img) {
        newQuestion = new Question({
            questionstitle: questionDataJson.QuestionTitle,
            choices: questionDataJson?.Choice.map(choice => {
                return choice;
            }),

            // imgUrl: img.path.replace("\\", "/")
            // ans: questionDataJson.ans
        })
    }
    else {
        newQuestion = new Question({
            questionstitle: questionDataJson.QuestionTitle,
            choices: questionDataJson?.Choice.map(choice => {
                return choice;
            }),
            imgUrl: img.path.replace("\\", "/")
            // ans: questionDataJson.ans
        })
    }
    try {
        newQuestion.choices[questionDataJson.ans - 1].isCorrect = true
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
    console.log(questionData)
    console.log(req.file)
    const questionDataJson = JSON.parse(questionData)
    try {
        let editQuestion = await Question.findById(questionDataJson.QuestionId);
        if (!req.file) {
            editQuestion.imgUrl = "images/1x1.png"
        }
        else {
            editQuestion.imgUrl = req.file.path.replace("\\", "/")
        }
        editQuestion.questionstitle = questionDataJson.QuestionTitle;
        editQuestion.choices[0].choiceTitle = questionDataJson.Choice[0].choiceTitle;
        editQuestion.choices[1].choiceTitle = questionDataJson.Choice[1].choiceTitle;
        editQuestion.choices[2].choiceTitle = questionDataJson.Choice[2].choiceTitle;
        editQuestion.choices[3].choiceTitle = questionDataJson.Choice[3].choiceTitle;
        editQuestion.ans = questionDataJson.ans;
        editQuestion.choices.map(choice => {
            choice.isCorrect = false
        })
        editQuestion.choices[questionDataJson.ans - 1].isCorrect = true
        await editQuestion.save()
        const setofQuestion = await SetOfQuestion.findById(questionDataJson.soqId).populate('questions')
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

exports.patchScore = async (req, res, next) => {

    const { soqIdScore, userScore, user } = req.body

    // const newTableScore = new TableScore({
    //     soqid: soqIdScore,
    //     score: userScore
    // })

    // await newTableScore.save()
    const date = new Date();
    const newTableScore = { soqid: soqIdScore, score: userScore, time: date.toLocaleTimeString()  }
    let submittedUser = await User.findOne(user)
    await submittedUser.history.push(newTableScore)
    submittedUser = await submittedUser.populate('history')
    await submittedUser.save();
    res.status(200).json({
        msg: "add success"
    })

}

exports.getScore = async (req, res, next) => {
    const soqId = req.params.SetOfQuestionId;
    let users
    // const timeElapsed = Date.now();
    // let timeNow = new Date(timeElapsed);
    // timeNow = timeNow.toLocaleTimeString();
    await User.find({ "history.soqid": soqId })
        .then(result => { users = result })
    // users.history = users.map(user => {
    //     user.history.filter(his => {
    //         return his.soqid.equals(mongoose.Types.ObjectId(soqId))
    //     })
    // })
    return res.status(200).json({
        users: users,
    })


}


exports.CreateLobby = async (req, res, next) => {
    const soqId = req.params.SetOfQuestionId;
    console.log(soqId)
    try {
        newLobby = new Lobby({
            soqId: soqId
        })
        newLobby.save()
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.CreateRoom = async (req, res, next) => {
    const soqId = req.params.SetOfQuestionId;
    // console.log(database.ref(db(), 'lobby'))

    database.get(database.ref(db(), 'lobby/' + soqId)).then((snapshot) => {
        const data = snapshot.val();

        const allUser = data.users;

        const room = {}
        let obj = {
            users: [],
            chat: [{
                by: "system",
                text: "เริ่มทำข้อสอบเมื่อ..."
            }],
            questionsNumber: 1
        }

        for (let i = 0; i < allUser.length; i++) {
            const userId = allUser[i];
            // console.log(userId);

            if (obj.users.length < 2) {
                obj.users.push(userId)
                // console.log(array);

                if (obj.users.length == 2) {
                    room[obj.users[0]+"_"+obj.users[1]] = obj
                    obj = {
                        users: [],
                        chat: [{
                            by: "system",
                            text: "เริ่มทำข้อสอบเมื่อ..."
                        }],
                        questionsNumber: 1
                    }
                }
            }
        }

        if (obj.users.length > 0) {
            room[obj.users[0]] = obj
        }

        database.update(database.ref(db(), 'lobby/' + soqId), {
            state: "start",
            room: room,
        });

        // if (snapshot.exists()) {
        //     const data = snapshot.val();
        //     const roomAll = data
        //     let check = false

        //     for (let i = 0; i < roomAll.length; i++) {
        //         const roomAllStudent = roomAll[i];

        //         if (roomAllStudent.length < 2 && !roomAllStudent.includes(name)) {
        //             roomAll[i].push(name)
        //             // database.update(room, roomAll);
        //             database.update(database.ref(db, 'lobby/' + soqId), {
        //                 room: roomAll
        //             });
        //             check = true
        //             break
        //         }
        //     }
        //     if (!check) {
        //         roomAll.push([name])
        //         database.update(database.ref(db, 'lobby/' + soqId), {
        //             room: roomAll
        //         });
        //     }

        // } else {
        //     database.update(database.ref(db, 'lobby/' + soqId), {
        //         room: [[name]]
        //     });
        // }
    })



    // try {
    //    newRoom = new Room({
    //        soqId: soqId
    //     })
    //     newRoom.save()
    //     }
    // catch (err) {
    //     if (!err.statusCode) {
    //         err.statusCode = 500;
    //     }
    //     next(err);
    // }


}


