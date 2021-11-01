const express = require('express');
const app = require('../../app');
const router = express.Router();
const mongoose = require('mongoose')

// Get Models
const Suppliers = require('../../models/Supplier');
const Category = require('../../models/Category');
const Items = require('../../models/Items');
const { isValidObjectId } = require('mongoose');

// @route   GET api/item
// @descr   Get All Item
// @access  Public 
router.get('/', (req, res) => {
    Items.find()
        .populate({path: 'supplier', model: Suppliers})
        .populate({path: 'category', model: Category})
        .exec((err, item) => {
            if (err) console.log(err)
            res.json(item)
        })
})

// @route   GET api/item/:id
// @descr   Get Item
// // @access  Public 
router.get('/:id', (req, res) => {
    Items.findById(req.params.id)
        .populate({path: 'supplier', model: Suppliers})
        .populate({path: 'category', model: Category})
        .exec((err, item) => {
            if (err) console.log(err)
            res.json(item)
        })
  });

// @route   POST api/item
// @descr   Add new item
// @access  Public 
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
    if (req.body.submit === 'homepage') {
      res.redirect('/')
    } else if (req.body.submit === 'add-new') {
      res.redirect('/new')
    }
  })

// @route   DELETE api/item
// @descr   Delete an item
// @access  Public
router.post('/delete/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => item.remove().then(() => res.redirect('/')))
        .catch(err => res.status(404).json({ success: false }))
    })

// @route   UPDATE api/item
// @descr   Update an item
// @access  Public
router.post('/update/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => {
            item.equipment = req.body.equipment,
            item.description = req.body.description,
            item.supplier = req.body.supplier,
            item.category = req.body.category,
            item.quantity = req.body.quantity,
            item.url = req.body.url,
            item.price = req.body.price

            item.save()
        }).then(() => res.redirect('/'))
        .catch(err => res.status(404).json({ success: false }))
    })

module.exports = router;