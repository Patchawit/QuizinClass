const express = require("express")
const mongoose = require("mongoose")
const Cookies = require('universal-cookie');
var cors = require('cors')
const app = express()
const mongodburi = "mongodb+srv://administer1150:0858881292Get@quizinclass.1kaqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const AdminRouter = require('./routes/AdminRouter')
// const passportSetup = require("./googleUtil");
const passport = require("passport");
const authRoutes = require("./routes/Auth");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const User = require('./models/User');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.use((req, res, next) => {
//   // const cookies = req.header('Authcookie');
//   console.log(req)
//   // if (!req.session.user) {
//   //   return next()
//   // }
//   // User.findById(req.session.user._id)
//   //   .then(user => {
//   //     req.user = user;

//   //     next()
//   //   })
//   //   .catch(err => console.log(err))
//   console.log("Hummmm")
//   // console.log(cookies,"Pornhub");
//   // console.log(cookies)
//   next()
// })


// app.use('/', (req, res) => res.status(200).json({ title: 'GeeksforGeeks' }))
app.use('/admin', AdminRouter.router)



app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const store = new MongoDBStore({
  uri: mongodburi,
  collection: 'session'
})

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'bla bla bla',
  store: store
}));


// app.use((req, res, next) => {
//   if (!req.user) {
//     return next()
//   }
//   User.find(req.user)
//     .then(user => {
//       req.user = user;
//       next()
//     })
//     .catch(err => console.log(err))
// })


// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);




mongoose.connect(mongodburi)
  .then(result => {
    app.listen(7050, () => console.log("Server start at Port 7050"))
  })
  .catch(Error => console.log(Error))

