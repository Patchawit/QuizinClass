const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
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
const multer = require('multer');


app.use(cors())
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

console.log(path.join(__dirname, "images"))
app.use('/images', express.static(path.join(__dirname, "images")))

const storage = multer.diskStorage({ // ในส่วนนี้จะเป็น configของMulter ว่าจะให้เก็บไฟล์ไว้ที่ไหน และ Rename ชื่อไฟล์
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(multer({ storage: storage, fileFilter: fileFilter }).single('img'))

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


<<<<<<< HEAD
=======
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'))
>>>>>>> 47008d249109731ea13467a91a4c9ef70c972c33



mongoose.connect(mongodburi)
  .then(result => {
    app.listen(7050, () => console.log("Server start at Port 7050"))
  })
  .catch(Error => console.log(Error))



