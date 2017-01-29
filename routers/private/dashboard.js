/**
 * Handles requests for the dashboard view
 * @module private/dashboard
 */
var express = require('express');
var router = express.Router();
var Donation = require('../../models/donation');

//GET private/dashboard/donations
router.get('/donations', function(req,res) {
  //get all donations
  Donation.find({}, function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({ donations: results });
    } // end else
  }); // end find
}); // end get

// PUT private/dashboard/thank
router.put('/thank', function(req,res) {
  console.log('dashboard put route hit', req.body);
  var id = req.body.id;
  var now = new Date();
  //update thanked status of donation
  Donation.update({'_id': id },{ $set:{ 'thanked' : true , 'thanked_date': now } }, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('thanked-->', id, results);
      res.sendStatus(200);
    } // end else
  }); // end update
}); // end put

// GET private/dashboard/dates
//gets months/year of donations
router.get('/dates', function(req,res) {
  console.log('/private/dashboard/dates get route hit');
  Donation.aggregate([{$project:{year: { $year: "$date" },month: { $month: "$date" }}}], function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    } // end else
  }); // end aggregate
}); // end get

module.exports = router;
