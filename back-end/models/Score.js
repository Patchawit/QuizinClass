const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  ScoreSchema = new Schema({
    soqid:{
        type: Schema.Types.ObjectId,
        ref: 'SetOfQuestion'
    },
    score: 
        { 
            type: Number 
        }
        
});

module.exports = mongoose.model('Score', ScoreSchema);