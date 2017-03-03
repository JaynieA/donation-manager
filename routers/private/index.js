/**
 * Handles all routing for private routes.
 * @module routers/private/index
 */
var express = require('express');
var router  = express.Router();

//Require subroutes
var templates = require('./templates');
var email = require('./email');
var pdf = require('./pdf');
var docs = require('./docs');
var donations = require('./donations');
var users = require('./users');

/** ---------- SUBROUTES ---------- **/
router.use('/templates', templates);
router.use('/email', email);
router.use('/pdf', pdf);
router.use('/docs', docs);
router.use('/donations', donations);
router.use('/users', users);

//GET private/index
router.get('/', function (req, res) {
  res.redirect('/#!/home'); // they made it!
});

module.exports = router;
