/**
 * @module private/pdf
 */
var express = require('express');
var router = express.Router();
//require custom modules
var generatePDF = require('../../utils/generatePDFDocument.js');

 // GET /private/pdf
router.put('/', function (req, res) {
  console.log('PDF ROUTE REQUEST-->', req.body);
  //use module to generate the new pdf 
  generatePDF(req.body, res);
}); // end get

module.exports = router;
