const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  SubjectCategorySchema = new Schema({
    subjecttitle: {
        type: String,
        required: true,
        unique: true
    },
    createby: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

});

module.exports = mongoose.model('SubjectCategory', SubjectCategorySchema);