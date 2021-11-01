const express = require('express');
const router = express.Router();

// Models
const Suppliers = require('../models/Supplier');
const Category = require('../models/Category');
const Items = require('../models/Items');
const { isValidObjectId } = require('mongoose');

// /* GET home page */
router.get('/', (req, res, next) => {
  Items.find()
    .populate({path: 'supplier', model: Suppliers})
    .populate({path: 'category', model: Category})
    .exec((err, items) => {
      if (err) console.log(err)
      res.render('index', {
        title: 'Inventory Page',
        items
      })
  })
});

module.exports = router;
