const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LobbyOfQuestionSchema = new Schema({

    // User ที่ดึงค่าจากตอนสแกน Qr code 

    Users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],

    soqid:{
        type: Schema.Types.ObjectId,
        ref: 'SetOfQuestion'
        },
    

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

module.exports = mongoose.model('Lobby', LobbyOfQuestionSchema);