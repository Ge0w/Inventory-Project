const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

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

// Add item
router.post('/new', (req, res) => {
  
  // Create new item
  const newItem = new Items({
      equipment: req.body.equipment,
      description: req.body.description,
      supplier: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      url: req.body.url,
      price: req.body.price
  });

// Save item & redirect to homepage
  newItem.save()
  res.redirect('/')
})

module.exports = router;
