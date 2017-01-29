/**
 * Handles requests for donations
 * @module private/donations
 */
var express = require('express');
var router = express.Router();
var Donation = require('../../models/donation');

//GET private/donations
router.get('/', function(req,res) {
  //get all donations
  Donation.find({}, function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({ donations: results });
    } // end else
  }); // end find
}); // end get

//GET /private/donations/monthly
router.get('/monthly/:q?', function(req,res) {
  //calculate current year
  var currentYear = new Date().getFullYear();
  //subtract one to account for date formatting
  var month = Number(req.params.q) - 1;
  Donation.find({ donation_month: month , donation_year: currentYear }, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    } // end else
  }); // end find
}); // end get

module.exports = router;
