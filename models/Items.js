const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ItemsSchema = new Schema({
    equipment: String,
    description: String,
    supplier: String,
    category: String,
    quantity: Number,
    url: String,
    price: Number
});

module.exports = Items = mongoose.model('items', ItemsSchema)