/**
 * Handles requests to the private/email router
 * @module private/email
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//require custom app modules
var postmark = require('../../config/postmark');

var sendEmail = function(donation) {
  //TODO: add template text to text and html below

  //create email text
  var textEmail = 'Dear ' + donation.donor_name + ',\n';
  textEmail += 'Thank you for your donation of $' + donation.donation_amt + '.';

  //create email html
  var htmlEmail = '<b>Dear ' + donation.donor_name + ' ,</b>\n';
  htmlEmail += '<p>Thank you for your donation of $' + donation.donation_amt + '.</p>';

  //create sendmail transport
  var transporter = nodemailer.createTransport({
    //use postmark api credentials
    service: 'postmark',
    auth: {
      user: postmark.user,
      pass: postmark.pass
    } // end auth
  }); // end createTransport

  //set up options
  var mailOptions = {
    from: postmark.email, // sender address
    to: '<'+donation.donor_email+'>', //receiver
    subject: 'Spot\s last stop thanks you for your donation', //subject line
    text: textEmail, // plain text
    html: htmlEmail //html
  }; // end mailOptions

  console.log(mailOptions);

  //send the email
  transporter.sendMail( mailOptions, function(error, message ) {
    //if there was an error, log it
    if (error) {
      console.log(error);
    // else, print success message
    } else {
      console.log('Message %s sent: %s', message.messageId, message.response);
    } // end else
  }); // end sendMail

}; // end sendEmail

// POST
router.post('/', function(req,res) {
  console.log(req.body);
  var donation = req.body;
  sendEmail(donation);
  res.send(req.body);
}); // end post

module.exports = router;
