var express = require('express');
var router = express.Router();
const Suppliers = require('../models/Supplier');
const Category = require('../models/Category');

/* GET new page. */
router.get('/', (req, res, next) => {
  Suppliers.find()
    .exec((err, suppliers) => {
      Category.find().exec((err, categorys) => {
        if (err) console.log(err)
        res.render('new', { 
          title: "New Item",
          suppliers,
          categorys
      });
    })
  })
});

module.exports = router;
