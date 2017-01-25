/**
 * Handles requests to the private/email router
 * @module private/email
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//require custom app modules
var postmark = require('../../config/postmark');
var Template = require('../../models/template');

// POST --> send email
router.post('/', function(req,res) {
  var donation = req.body;
  //get default email template text
  Template.find({default:true, type:'email'}, function(err, results) {
    if (err) {
      //if there is an error, log it and send error code
      console.log(err);
      res.sendStatus(500);
    } else {
      //if the default text is found, continue
      console.log(results);
      var templateText = results[0].text;
      var signature1 = "Grant and Casey Adams" + '\n';
      var signature2 = 'Founders of Spot\s Last Stop' + '\n';
      var signature3 = 'info@spotslaststop.org' + '\n';
      //create email text
      var textEmail = 'Dear ' + donation.donor_name + ',\n\n';
      textEmail += 'Thank you for your recent donation of $' + donation.donation_amt + ' to Spot\'s Last Stop. ';
      textEmail += templateText + '\n\n';
      textEmail += 'Again, Thank You!' + '\n\n';
      textEmail += signature1 + '\n';
      textEmail += signature2 + '\n';
      textEmail += signature3 + '\n';
      //create email html
      var htmlEmail = '<p>Dear ' + donation.donor_name + ' ,</p>\n';
      htmlEmail += '<p>Thank you for your recent donation of $' + donation.donation_amt + ' to Spot\s Last Stop. ';
      htmlEmail += templateText + '</p>';
      htmlEmail += '<p>Again, Thank You!</p>' + '\n';
      htmlEmail += '<p>' + signature1 + '<br>';
      htmlEmail +=  signature2 + '<br>';
      htmlEmail +=  signature3 + '</p>\n';
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
          res.sendStatus(201);
        } // end else
      }); // end sendMail
    } // end else
  }); // end find
}); // end post

module.exports = router;
