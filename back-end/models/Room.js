const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomOfQuestionSchema = new Schema({

    // User ที่ดึงค่าจากตอนสแกน Qr code 
    
    
    // User: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: '',
    //     }
    // ],

    // Lobby:{
    //     type: Schema.Types.ObjectId,
    //     ref: '',
    // },




    // score: [
    //     {
    //         score: { type: Number },
    //         student: { type: Schema.Types.ObjectId,ref:'User'}
    //     }
    //     ],


});

module.exports = mongoose.model('Room', RoomOfQuestionSchema);