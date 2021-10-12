const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ItemsSchema = new Schema({
    equipment: String,
    description: String,
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    quantity: Number,
    url: String,
    price: Number
});

module.exports = Items = mongoose.model('items', ItemsSchema)