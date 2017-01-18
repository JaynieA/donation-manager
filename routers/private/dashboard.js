/**
 * Handles requests for the dashboard view
 * @module private/dashboard
 */
var express = require('express');
var router = express.Router();
/**
 * GET /private/dashboard
 */
router.get('/', function (req, res) {
  //send true if user has been authenticated and has admin status
  res.send({ authStatus: true });
});

module.exports = router;
