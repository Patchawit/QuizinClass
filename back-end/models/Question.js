const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const choicesSchema = new Schema({
    choiceTitle: {
        type: String
    },
    choiceImg: {
        type: String
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
})

const questionsSchema = new Schema({
    questionstitle: {
        type: String,
        // required: true,
        // unique: true
    },
    imgUrl: {
        type: String,
        default: "images/1x1.png",
        required: false
    },
    choices: [choicesSchema],
    // ans: {
    //     type: Number
    // }

});



module.exports = mongoose.model('Question', questionsSchema);