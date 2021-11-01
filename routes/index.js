const express = require('express');
const router = express.Router();

// Models
const Items = require('../models/Items');
const { isValidObjectId } = require('mongoose');

/* GET home page. */
router.get('/', (req, res, next) => {
  Items.find({}, (err, items) => {
    res.render('index', { 
      title: 'Inventory Project',
      items
     })
  })
});

module.exports = router;
