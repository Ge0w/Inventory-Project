var express = require('express');
var router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/User');

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

/* GET update page. */
router.get('/', (req, res, next) => {
  res.render('login', { 
    title: "Login" 
  });
});

// Login
router.post(
"/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = router;