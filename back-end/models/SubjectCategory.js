const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  SubjectCategorySchema = new Schema({
    subjecttitle: {
        type: String,
        required: true,
        unique: true
    },
    // techer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     require: true
    // },

});

module.exports = mongoose.model('SubjectCategory', SubjectCategorySchema);