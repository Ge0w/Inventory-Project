const express = require('express');
const app = require('../../app');
const router = express.Router();

// Item Model
const Suppliers = require('../../models/Supplier');

// @route   GET api/supplier
// @descr   Get All Supplier
// @access  Public 
router.get('/', (req, res) => {
    Suppliers.find()
        .then(supplier => res.json(supplier))
})

// @route   GET api/suppliers/:id
// @descr   Get a category
// @access  Public 
router.get('/:id', (req, res) => {
    Suppliers.findById(req.params.id)
        .then(category => res.json(category))
  });

// @route   POST api/supplier
// @descr   Create an supplier 
// @access  Public 
router.post('/', (req, res) => {
    const newSupplier = new Suppliers({
        name: String,
        email: String,
        website: String,
        telephone: String
    });

    newSupplier.save().then(supplier => res.json(supplier));
})

// @route   DELETE api/item
// @descr   Delete an item 
// @access  Public
router.delete('/:id', (req, res) => {
    Suppliers.findById(req.params.id)
        .then(supplier => supplier.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
    })

module.exports = router;