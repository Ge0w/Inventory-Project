var express = require('express');
var router = express.Router();

/* GET new page. */
router.get('/', (req, res, next) => {
  res.render('new', { 
    title: "New Item" 
  });
});

module.exports = router;
