const express = require("express")
const mongoose = require("mongoose")
var cors = require('cors')
const app = express()
const mongodburi = "mongodb+srv://administer1150:0858881292Get@quizinclass.1kaqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const AdminRouter = require('./routes/AdminRouter')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/admin', AdminRouter.router)


mongoose.connect(mongodburi)
    .then(result => {
        app.listen(5000, () => console.log("Server start at Port 5000"))
    })
    .catch(Error => console.log(Error))