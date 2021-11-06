var express = require('express');
var router = express.Router();

//Get User
const User = require("../models/User")

/* GET update page. */
router.get('/', (req, res, next) => {
  res.render('register', { 
    title: "Register Page" 
  });
});

// Register user
router.post("/", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  }).save(err => {
    if (err) { 
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
