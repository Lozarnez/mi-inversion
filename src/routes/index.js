const express = require('express');
const router = express.Router();

//Server routes
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;