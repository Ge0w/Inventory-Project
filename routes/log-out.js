const express = require('express');
const router = express.Router();

/* GET log-out page & log-out */
router.get("/", (req, res) => {
    req.logout();
    res.redirect("/");
  });

module.exports = router;
