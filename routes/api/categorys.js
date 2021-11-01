const express = require('express');
const app = require('../../app');
const router = express.Router();

// Item Model
const Categorys = require('../../models/Category');

// @route   GET api/item
// @descr   Get All Item
// @access  Public 
router.get('/', (req, res) => {
    Categorys.find()
        .then(categorys => res.json(categorys))
})

// @route   GET api/categorys/:id
// @descr   Get a category
// @access  Public 
router.get('/:id', (req, res) => {
    Categorys.findById(req.params.id)
        .then(category => res.json(category))
  });

// @route   POST api/categorys
// @descr   Create an category 
// @access  Public 
router.post('/', (req, res) => {
    const newCategory = new Categorys({
        name: String,
        description: String,
        url: String
    });

    newCategory.save().then(category => res.json(category));
})

// @route   DELETE api/categorys
// @descr   Delete an category 
// @access  Public
router.delete('/:id', (req, res) => {
    Categorys.findById(req.params.id)
        .then(category => category.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
    })

module.exports = router;