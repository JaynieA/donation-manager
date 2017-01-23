/**
 * @module private/pdf
 */
var express = require('express');
var router = express.Router();

 // GET /private/pdf
router.get('/', function (req, res) {
  //require custom modules
  var pdfGen = require('../../utils/generatePDFDocument.js');
  res.sendStatus(200);
});

module.exports = router;
