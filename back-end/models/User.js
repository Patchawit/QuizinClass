const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleId: { type: String, },
    name: { type: String },
    email: {
        type: String,
        // match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
    },
    usertype: { type: String },

    // history: [{ 
    //     type: Schema.Types.ObjectId,
    //     ref:'TableScore',
    // }] 
    history: [{
        soqid: {
            type: Schema.Types.ObjectId,
            ref: 'SetOfQuestion'
        },
        // Question: [
        //     {
        //         questionid: {
        //             type: Schema.Types.ObjectId,
        //             ref: 'Question'
        //         },
        //         userAns: {
        //             type: Number
        //         }
        //     }
        // ],
        score: {
            type: Number
        },
        studentAns: [
            {
                items: { type: String },
                ans: {
                    choiceTitle: { type: String },
                    choiceImg: { type: String },
                    isCorrect: { type: Boolean }
                }

            }
        ],

        time: { type: String },
    }]

});
module.exports = mongoose.model("User", userSchema);