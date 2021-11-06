var express = require('express');
var router = express.Router();

// Models
const Suppliers = require('../models/Supplier');
const Category = require('../models/Category');
const Items = require('../models/Items');

/* GET update page. */
router.get('/', (req, res, next) => {
  res.render('update', { 
    title: "Update Item" 
  });
});

/* GET update item ID page. */
router.get('/:id', (req, res, next) => {
    Items.findById(req.params.id)
    .populate({path: 'supplier', model: Suppliers})
    .populate({path: 'category', model: Category})
    .exec((err, item) => {
      if (err) console.log(err)
      res.render('update', {
        title: 'Item Page',
        item
      })
})
  });

module.exports = router;
