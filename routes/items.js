const express = require('express');
const router = express.Router();
const Items = require('../models/Items');

/* GET items page. */
router.get('/', (req, res, next) => {
    res.render('items', { 
      title: "Item Page" 
    });
  });

/* GET item ID page. */
// router.get('/:id', (req, res, next) => {
//     Items.findById(req.params.id, (err, item) => {
//         res.render('items', { 
//             title: "Item Page",
//             item
//             });
//     })
//   });

/* GET item ID page with populate test. */
router.get('/:id', (req, res, next) => {
    Items.findById(req.params.id)
      .populate('supplier')
      .populate('category')
      .exec((err, item) => {
        if (err) console.log(err)
        
        res.render('items', { 
          title: "Item Page",
          item
          });
      })
  });

module.exports = router;
