/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var home = require('./home');

/** ---------- SUBROUTES ---------- **/
router.use('/home', home);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  console.log('you made it!');
  //TODO: fix the following line... it's probably not correct
  res.redirect('/'); // they made it!
});

module.exports = router;
