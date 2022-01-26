const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    questionstitle: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: false
    },
    choices: [{
        type: Schema.Types.ObjectId,
        ref: 'Choice',
        require: true
    }]

});

module.exports = mongoose.model('Question', questionsSchema);