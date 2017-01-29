/**
 * Handles requests for donations
 * @module routers/private/donations
 */
var express = require('express');
var router = express.Router();
var Donation = require('../../models/donation');

//GET private/donations
//get all donations in database
router.get('/', function(req,res) {
  //find all donations
  Donation.find({}, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send({ donations: results });
    } // end else
  }); // end find
}); // end get

//GET /private/donations/year
//get all donations from current year
router.get('/year', function(req, res) {
  console.log('donations GET /year route hit');
  //find all donations from current year
  Donation.find({donation_year: new Date().getFullYear()}, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    } // end else
  }); // end find
}); // end get

//GET /private/donations/monthly
//get all donations from requested month
router.get('/monthly/:q?', function(req,res) {
  //calculate current year
  var currentYear = new Date().getFullYear();
  //subtract one to account for date formatting
  var month = Number(req.params.q) - 1;
  Donation.find({ donation_month: month , donation_year: currentYear }, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    } // end else
  }); // end find
}); // end get

module.exports = router;
