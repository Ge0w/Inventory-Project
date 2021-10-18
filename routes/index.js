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

// Add item
router.post('/new', (req, res) => {
  const newItem = new Items({
      equipment: req.body.equipment,
      description: req.body.description,
      supplier: 'TBC',
      category: 'TBC',
      quantity: req.body.quantity,
      url: req.body.url,
      price: req.body.price
  });

  newItem.save().then(item => res.json(item));
  res.redirect('/');
})


module.exports = router;
