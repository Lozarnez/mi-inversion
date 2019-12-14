const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

//Server routes
router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

//Using local strategy from passport
router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/packages',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0) {
    errors.push({text: 'Ingrese un nombre'});
  }
  if (password != confirm_password) {
    errors.push({text: 'La contraseña debe coincidir con la confirmación'});
  }
  if (password.length < 4) {
    errors.push({text: 'La contraseña debe ser mayor a cuatro caracteres'});
  }
  if (errors.length > 0) {
    res.render('users/signup', {errors, name, email, password, confirm_password});
  } else {
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'Ese correo ya cuenta con registro, prueba con otro');
      res.redirect('/users/signup');
    }
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    req.flash('success_msg', 'Registro completado');
    res.redirect('/users/signin');
  }
});

router.get('/users/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

module.exports = router;