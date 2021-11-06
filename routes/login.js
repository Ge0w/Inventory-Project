var express = require('express');
var router = express.Router();

/* GET update page. */
router.get('/', (req, res, next) => {
  res.render('login', { 
    title: "Login" 
  });
});

module.exports = router;
