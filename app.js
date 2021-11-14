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
const bcrypt = require('bcryptjs')
require('dotenv').config()


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
const logoutRouter = require('./routes/log-out');
const { connected } = require('process');

const app = express();

// Passport Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport setup
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/log-out', logoutRouter);

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
const dbPassword = process.env.DB_PASS
const mongoDB = `mongodb+srv://geo:${dbPassword}@inventoryproject.yrhth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
