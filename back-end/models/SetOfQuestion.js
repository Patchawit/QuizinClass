const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  SetOfQuestionSchema = new Schema({
    soqtitle: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'SubjectCategory',
        // require: true
    },
    questions: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        // require: true
    }
    ],

    score: [
        {
            score: { type: Number },
            student: { type: Schema.Types.ObjectId,ref:'User'}
        }
        ],


});

module.exports = mongoose.model('SetOfQuestion', SetOfQuestionSchema);