/**
 * @module private/calendar
 */
var express = require('express');
var router = express.Router();
/**
 * GET /private/templates
 */
router.get('/', function (req, res) {
  res.send({ message: 'hi. i\m the templates page' });
});

module.exports = router;
