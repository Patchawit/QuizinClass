const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Product', productSchema);