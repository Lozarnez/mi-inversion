const helpers = {};

//Authenticating the user with passport module
helpers.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Debes iniciar sesion');
  res.redirect('/users/signin');
};

module.exports = helpers;