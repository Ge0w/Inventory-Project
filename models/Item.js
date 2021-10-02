const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ItemSchema = new Schema({
    equipment: String,
    description: String,
    supplier: Supplier,
    category: Category,
    quantity: Number,
    url: String,
    price: Number
});

module.exports = Item = mongoose.model('item', ItemSchema)