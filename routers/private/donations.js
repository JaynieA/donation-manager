/**
 * Handles requests for donations
 * @module routers/private/donations
 */
var express = require('express');
var router = express.Router();
//require custom app modules
var async = require('async');
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

//POST /private/donations
//save uploaded donation information
router.post('/', function(req,res) {
  console.log(req.body.donations);
  var donations = req.body.donations;
  //for each donation in donations
  async.each(donations, function (donation, callback) {
    // Create new donation object
    var newDonation = new Donation(donation);
    //Check if the newDonation matches an existing donation (on date, name, amount, origin)
    Donation.findOne({date: donation.date, donor_name: donation.donor_name, donation_amt: donation.donation_amt,
                      origin: donation.origin}, function(err, results) {
      if (err) { console.log(err); }
      if (!results) {
        //if no pre-existing matches
        console.log('no pre-existing matches');
        //save the donation
        newDonation.save(function (err) {
          if (err) {
            console.log('save err:',err);
          } else {
            console.log('saving Donation: '+ newDonation.donor_name);
            callback();
          } // end else
        }); // end save
      } else {
        //if a match exists, don't save but continue
        console.log('already exists -->',results);
        callback();
      } // end else
    }); // end find
  }, function (error) {
    if (error) {
      //TODO: add error handling to gracefully fail if duplicates exist
      console.log('Error:', error);
      //if (err) return next(err);
      //res.sendStatus(500);
    }  // end if
    console.log('Donations saved');
    return res.sendStatus(201);
  }); // end callback
}); // end post

module.exports = router;
