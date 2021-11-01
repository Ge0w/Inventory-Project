var express = require('express');
var router = express.Router();

/* GET update page. */
router.get('/', (req, res, next) => {
  res.render('update', { 
    title: "Update Item" 
  });
});

/* GET update item ID page. */
router.get('/:id', (req, res, next) => {
    Items.findById(req.params.id, (err, item) => {
        res.render('update', { 
            title: "Item Page",
            item
            });
    })
  });

module.exports = router;
