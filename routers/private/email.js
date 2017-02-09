/**
 * Handles requests to the private/email router
 * @module private/email
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');
//require custom app modules
var postmark = require('../../config/postmark');
var Template = require('../../models/template');
var banner_img = require('../../docs/base64_banner.html');

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
      var templateText = results[0].text;
      var signature1 = "Grant and Casey Adams" + '\n';
      var signature2 = 'Founders of Spot\s Last Stop' + '\n';
      var signature3 = 'info@spotslaststop.org' + '\n';
      //create email text
      var textEmail = 'Dear ' + donation.donor_name + ',\n\n';
      textEmail += 'Thank you for your recent donation of $' + donation.donation_amt + ' to Spot\'s Last Stop. ';
      textEmail += templateText + '\n\n';
      textEmail += 'Again, Thank You!' + '\n\n';
      //add signature
      textEmail += signature1 + '\n';
      textEmail += signature2 + '\n';
      textEmail += signature3 + '\n';
      //create email html
      var htmlEmail = '<p style="font-size:15px;">Dear ' + donation.donor_name + ',</p>\n';
      htmlEmail += '<p style="font-size:14px; white-space:pre-wrap;">Thank you for your recent donation of $' + donation.donation_amt + ' to Spot\s Last Stop. ';
      htmlEmail += templateText + '</p>';
      htmlEmail += '<p style="font-size:15px;">Again, Thank You!</p>' + '\n';
      //Inline the base64 encoded banner image
      htmlEmail += banner_img;
      //add signature
      htmlEmail += '<p style="margin-top:0">' + signature1 + '<br>';
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
      //Attach inlineBase64 as a 'compile' handler for a nodemailer transport object
      transporter.use('compile', inlineBase64());
      //set up options
      var mailOptions = {
        from: postmark.email, // sender address
        // to: '<'+donation.donor_email+'>', //receiver
        to: '<mrs.jaynie.anderson@gmail.com>', //receiver
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
