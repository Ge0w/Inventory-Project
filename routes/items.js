const express = require('express');
const router = express.Router();

// Get Models
const Suppliers = require('../models/Supplier');
const Category = require('../models/Category');
const Items = require('../models/Items');

/* GET items page. */
router.get('/', (req, res, next) => {
    res.render('items', { 
      title: "Item Page",
    });
  });

/* GET item ID page with populate test. */
router.get('/:id', (req, res, next) => {
    Items.findById(req.params.id)
      .populate({path: 'supplier', model: Suppliers})
      .populate({path: 'category', model: Category})
      .exec((err, item) => {
        if (err) console.log(err)
        res.render('items', {
          title: 'Item Page',
          item
        })
    })
  });

module.exports = router;
