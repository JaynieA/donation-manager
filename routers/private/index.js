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

/** ---------- SUBROUTES ---------- **/
router.use('/home', home);
router.use('/dashboard', dashboard);
router.use('/templates', templates);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  console.log('you made it!');
  res.redirect('/#!/home'); // they made it!
});

module.exports = router;
