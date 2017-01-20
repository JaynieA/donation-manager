/**
 * Handles requests for Google calendar data.
 * @module private/calendar
 */
var express = require('express');
var router = express.Router();
var Donation = require('../../models/donation');
/**
 * GET /private/home
 *
 * @todo Get some data from the Google API. Call the API using the token
 * saved to the user.
 * @see {@link https://www.npmjs.com/package/google-calendar}
 * @see {@link https://developers.google.com/google-apps/calendar/v3/reference/#Calendars}
 *
 */
router.get('/', function (req, res) {
  res.send({ authStatus: true });
});

router.post('/', function(req,res) {
  console.log(req.body.donations);
  var donations = req.body.donations;
  //create an entry in the database for each donation
  for (var i = 0; i < donations.length; i++) {
    var newDonation = new Donation(donations[i]);
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
