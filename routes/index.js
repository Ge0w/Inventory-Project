const express = require('express');
const router = express.Router();

// Models
const Items = require('../models/Items');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');

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

  // Find Supplier Info
  const supplierID = Category
      .find({name: req.body.supplier})
      .exec((err, supplier) => {
        if (err) console.log(err)
    })

  // Find Supplier Info
  const categoryID = Category
      .find({name: req.body.category})
      .exec((err, category) => {
        if (err) console.log(err)
    })

  console.log('Submitted')
  console.log(res.json(supplierID))
  console.log(res.json(categoryID))
  res.redirect('/')
  
  // Create new item
  // const newItem = new Items({
  //     equipment: req.body.equipment,
  //     description: req.body.description,
  //     supplier: supplierID._id,
  //     category: categoryID._id,
  //     quantity: req.body.quantity,
  //     url: req.body.url,
  //     price: req.body.price
  // });

  // newItem.save().then(item => res.json(item));
  // res.redirect('/');
})


module.exports = router;
