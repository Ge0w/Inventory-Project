const express = require('express');
const app = require('../../app');
const router = express.Router();

// Item Model
const Items = require('../../models/Items');

// @route   GET api/item
// @descr   Get All Item
// @access  Public 
router.get('/', (req, res) => {
    console.log('got in items')
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

// @route   DELETE api/item
// @descr   Delete an item 
// @access  Public
router.post('/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => item.remove().then(() => res.redirect('/')))
        .catch(err => res.status(404).json({ success: false }))
    })

module.exports = router;