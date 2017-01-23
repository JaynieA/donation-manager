/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var home = require('./home');
var dashboard = require('./dashboard');
var templates = require('./templates');
var email = require('./email');
var pdf = require('./pdf');

/** ---------- SUBROUTES ---------- **/
router.use('/home', home);
router.use('/dashboard', dashboard);
router.use('/templates', templates);
router.use('/email', email);
router.use('/pdf', pdf);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  console.log('you made it!');
  res.redirect('/#!/home'); // they made it!
});

module.exports = router;
