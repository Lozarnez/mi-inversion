const express = require('express');
const router = express.Router();

const Package = require('../models/Package');
const { isAuthenticated } = require('../helpers/auth');

//Server routes
router.get('/packages', isAuthenticated, async (req, res) => {
  const packages = await Package.find({ $or: [ {user: req.user.id}, {initial: true} ] });
  res.render('invPackages/all-packages', { packages });
});

router.get('/packages/new', isAuthenticated, (req, res) => {
  res.render('invPackages/new-package');
})

router.post('/invPackages/new-package', isAuthenticated, async (req, res) => {
  const { packageName, minInvestment, maxInvestment, increment, period } = req.body;
  //Validate inputs
  const errors = [];
  if(!packageName) {
    errors.push({text: 'Ingrese un nombre de paquete'});
  }
  if(!minInvestment || !maxInvestment || !increment || !period) {
    errors.push({text: 'Ingrese todos los campos'});
  }
  if(errors.length > 0) {
    res.render('invPackages/new-package', {
      errors,
      packageName,
      minInvestment,
      maxInvestment,
      increment,
      period
    });
  }
  else {
    const newPackage = new Package({ packageName, minInvestment, maxInvestment, increment, period });
    newPackage.user = req.user.id; //User authenticated id
    await newPackage.save();
    req.flash('success_msg', 'Paquete creado');
    res.redirect('/packages');
  }
});

router.get('/packages/edit/:id', async (req, res) => {
  const package = await Package.findById(req.params.id);
  res.render('invPackages/edit-package', {package});
});

router.put('/packages/edit-package/:id', async (req, res) => {
  const { packageName, minInvestment, maxInvestment, increment, period } = req.body;
  await Package.findByIdAndUpdate(req.params.id, { packageName, minInvestment, maxInvestment, increment, period });
  req.flash('success_msg', 'Paquete actualizado satisfactoriamente');
  res.redirect('/packages');
});

router.delete('/packages/delete/:id', async (req, res) => {
  await Package.findByIdAndRemove(req.params.id);
  req.flash('success_msg', 'El paquete ha sido eliminado')
  res.redirect('/packages');
})

module.exports = router;