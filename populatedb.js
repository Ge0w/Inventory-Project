#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/Items')
var Category = require('./models/Category')
var Supplier = require('./models/Supplier')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var suppliers = []
var categories = []

function itemCreate(equipment, description, supplier, category, quantity, url, price, cb) {
  itemdetail = {
    equipment: equipment,
    description: description,
    supplier: supplier,
    category: category,
    quantity: quantity,
    url: url,
    price: price
  }
  
  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}



function categoryCreate(name, description, url, cb) {
  var category = new Category({
        name: name,
        description: description,
        url: url 
    });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function supplierCreate(name, email, website, telephone, cb) {
  supplierdetail = { 
    name: name,
    email: email,
    website: website,
    telephone: telephone
  }
    
  var supplier = new Supplier(supplierdetail);    
  supplier.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Supplier: ' + supplier);
    suppliers.push(supplier)
    cb(null, supplier)
  });
}


function createSupplierCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate(
                'Mechanical',
                'Mechanical equipment etc.',
                'mechanical.com',
                callback
                );
        },
        function(callback) {
          supplierCreate('Bosch', 'bosch@bosch.com', 'bosch.com', '0208242383', callback);
        },
        ],
        // optional callback
        cb);
}

function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Boiler', 'Provides heating', suppliers[0], categories[0], 1, 'tbc.URL', 4,230, callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createSupplierCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('ITEMInstances: '+ items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

