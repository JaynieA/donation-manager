/**
 * @module private/calendar
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var Donation = require('../../models/donation');

// GET /private/home
router.get('/', function (req, res) {
  res.send({ authStatus: true });
});

//POST /private/home
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
        //if no match exists, don't save but continue
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

//POST /private/home
// router.post('/', function(req,res) {
//   console.log(req.body.donations);
//   var donations = req.body.donations;
//   //create an entry in the database for each donation
//   for (var i = 0; i < donations.length; i++) {
//     //use donation model to create new donation document
//     var newDonation = new Donation(donations[i]);
//     //save the new donation in the database
//     newDonation.save(function(err){
//       if(err){
//         console.log(err);
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(201);
//       }//end else
//     });//end save
//   } // end for
// }); // end pose

module.exports = router;
