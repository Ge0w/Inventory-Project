const express = require('express');
const app = require('../../app');
const router = express.Router();

// Item Model
const Items = require('../../models/Items');

// @route   GET api/item
// @descr   Get All Item
// @access  Public 
router.get('/', (req, res) => {
    Items.find()
        .then(items => res.json(items))
})

// @route   GET api/item
// @descr   Get All Item
// @access  Public 
router.get('/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => res.json(item))
  });

// @route   POST api/item
// @descr   Create an item 
// @access  Public 
router.post('/', (req, res) => {
    const newItem = new Items({
        equipment: req.body.equipment,
        description: req.body.description,
        supplier: req.body.supplier,
        category: req.body.category,
        quantity: req.body.quantity,
        url: req.body.url,
        price: req.body.price
    });

    newItem.save().then(item => res.json(item));
})

// @route   DELETE api/item
// @descr   Delete an item 
// @access  Public
router.delete('/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
    })

module.exports = router;