/**
 * @module private/docs
 * Serves the dynamically created PDF file to the browser to be printed
 */
var express = require('express');
var router = express.Router();
var path = require('path');

 // GET /private/pdf
router.get('/NewDoc.pdf', function(req, res) {
  console.log('get doc route hit');
  res.sendFile(path.join(__dirname, '../../docs', 'NewDoc.pdf'));
}); // end get

module.exports = router;
