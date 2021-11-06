const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User")
const initializePassport = require("./passport-config")

//Routers
const indexRouter = require('./routes/index');
const categorysRouter = require('./routes/api/categorys');
const suppliersRouter = require('./routes/api/suppliers');
const itemsRouter = require('./routes/api/items');
const newRouter = require('./routes/new');
const itemPageRouter = require('./routes/items');
const updatePageRouter = require('./routes/update');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const { connected } = require('process');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/api/categorys', categorysRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/items', itemsRouter);
app.use('/items', itemPageRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/update', updatePageRouter);

// Passport setup
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

//Passport session & serialization

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Set up default mongoose connection
const mongoDB = 'mongodb+srv://geo:geo123@inventoryproject.yrhth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
