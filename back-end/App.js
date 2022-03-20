const express = require("express")
const mongoose = require("mongoose")
var cors = require('cors')
const app = express()
const mongodburi = "mongodb+srv://administer1150:0858881292Get@quizinclass.1kaqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const AdminRouter = require('./routes/AdminRouter')
const passportSetup = require("./googleUtil");
const passport = require("passport");
const authRoutes = require("./routes/Auth");
const session = require('express-session');
// After you declare "app"
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/admin', AdminRouter.router)

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla' 
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use(passportSetup);

mongoose.connect(mongodburi)
  .then(result => {
    app.listen(5000, () => console.log("Server start at Port 5000"))
  })
  .catch(Error => console.log(Error))