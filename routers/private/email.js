/**
 * Handles requests to the private/email router
 * @module private/email
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//require custom app modules
var postmark = require('../../config/postmark');
var Donation = require('../../models/donation');

// POST --> send email
router.post('/', function(req,res) {
  var donation = req.body;
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
    //TODO: change this before deploying-- currently, all emails just send to me
    //to: '<'+donation.donor_email+'>', //receiver
    to: '<mrs.jaynie.anderson@gmail.com>',
    subject: 'Thank you for your donation', //subject line
    text: textEmail, // plain text
    html: htmlEmail //html
  }; // end mailOptions

  //send the email
  transporter.sendMail( mailOptions, function(error, message ) {
    //if there was an error, log it
    if (error) {
      console.log(error);
      res.sendStatus(500);
    // else, print success message
    } else {
      console.log('Message %s sent: %s', message.messageId, message.response);
      //update thanked status of donation
      Donation.update({'_id': donation.id },{ $set:{ 'thanked' : true } }, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log('thanked-->', donation.id, results);
        } // end else
      }); // end update

      res.sendStatus(201);
    } // end else
  }); // end sendMail

}); // end post

module.exports = router;
