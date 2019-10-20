const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { ensureAuthorized } = require('../config/auth');
// Load User model
const Offset = require('../models/offsets');

// Welcome Page
router.get('/', (req, res) =>
  res.render('welcome')
);

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  // Query for the Offset balance
  Offset
    .findOne({ empID: req.user.empID })
    .exec(function (err, data) {
      res.render('dashboard', {
        user: req.user,
        offsetBalance: data.balance
      }) // end of res.render
    }) // end of exec
); // end of GET

// Slots
router.get('/slots', ensureAuthenticated, (req, res) =>

  res.render('slots', {
    user: req.user
  }) // end of res.render

); // end of GET

module.exports = router;

