const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const choiceSchema = new Schema({
    choicetitle: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Choice', choiceSchema);