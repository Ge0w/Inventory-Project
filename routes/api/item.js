const express = require('express');
const app = require('../../app');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @descr   Get All Items
// @access  Public 
router.get('/')

module.exports = router;