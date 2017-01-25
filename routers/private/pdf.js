/**
 * @module private/pdf
 */
var express = require('express');
var router = express.Router();

 // GET /private/pdf
router.put('/', function (req, res) {
  console.log('PDF ROUTE REQUEST-->', req.body);
  //require custom modules
  var pdfGen = require('../../utils/generatePDFDocument.js');
  res.sendStatus(200);
}); // end get

module.exports = router;
