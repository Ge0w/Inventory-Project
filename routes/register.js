var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')

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
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    }).save(err => {
      if (err) { 
        return next(err);
      }
      res.redirect("/login");
    });
  })
});

module.exports = router;
