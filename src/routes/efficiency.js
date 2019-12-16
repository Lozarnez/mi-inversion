const express = require('express');
const router = express.Router();

const Package = require('../models/Package');

//Server routes
router.get('/packages/efficiency/:id', async (req, res) => {
  const package = await Package.findById(req.params.id);
  res.render('invPackages/efficiency', {package});
});

module.exports = router;