// Checks for the Passport Authentication
module.exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/users/login');
};

// Checks the user role
module.exports.ensureAuthorized = function (req, res, next) {
  if (req.user.role == "Admin") {
    return next();
  }
  req.flash('error_msg', 'You cannot access this page');
  res.redirect('/users/login');
};