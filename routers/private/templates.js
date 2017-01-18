/**
 * @module private/templates
 */
var express = require('express');
var router = express.Router();
/**
 * GET /private/templates
 */
router.get('/', function (req, res) {
  res.send({ authStatus: true });
});

module.exports = router;
