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

    history: [{ 
        type: Schema.Types.ObjectId,
        ref:'TableScore',
    }] 
    
});
module.exports = mongoose.model("User", userSchema);