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

module.exports = router;