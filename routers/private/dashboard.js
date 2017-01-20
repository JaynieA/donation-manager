/**
 * Handles requests for the dashboard view
 * @module private/dashboard
 */
var express = require('express');
var router = express.Router();
var Donation = require('../../models/donation');
/**
 * GET /private/dashboard
 */
router.get('/', function (req, res) {
  console.log('/private/dashboard route get route hit');
  //send true if user has been authenticated and has admin status
  //also send all donations in database
  Donation.find({}, function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({
        authStatus: true,
        donations: results
      });
    } // end else
  }); // end find

});

module.exports = router;
