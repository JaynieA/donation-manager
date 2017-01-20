/**
 * @module private/calendar
 */
var express = require('express');
var router = express.Router();
var Donation = require('../../models/donation');

// GET /private/home
router.get('/', function (req, res) {
  res.send({ authStatus: true });
});

//POST /private/home
router.post('/', function(req,res) {
  console.log(req.body.donations);
  var donations = req.body.donations;
  //create an entry in the database for each donation
  for (var i = 0; i < donations.length; i++) {
    //use donation model to create new donation document
    var newDonation = new Donation(donations[i]);
    //save the new donation in the database
    newDonation.save(function(err){
      if(err){
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }//end else
    });//end save
  } // end for
}); // end pose

module.exports = router;
