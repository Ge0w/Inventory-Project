const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const SupplierSchema = new Schema({
    name: String,
    email: String,
    website: String,
    telephone: String
});

module.exports = Supplier = mongoose.model('supplier', SupplierSchema)