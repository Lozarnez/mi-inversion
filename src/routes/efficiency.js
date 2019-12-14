const express = require('express');
const router = express.Router();

//Server routes
router.get('/packages/efficiency', (req, res) => {
  res.send('Tabla de rendimientos');
});

module.exports = router;