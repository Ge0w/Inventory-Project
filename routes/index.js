const express = require('express');
const router = express.Router();

// Item Model
const Items = require('../models/Items');

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
