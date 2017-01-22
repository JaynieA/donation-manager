/**
 * Handles requests to the private/email router
 * @module private/email
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//require custom app modules
var postmark = require('../../config/postmark');

var sendEmail = function() {

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
    to: '<mrs.jaynie.anderson@gmail.com>', //receiver
    subject: 'Hello World', //subject line
    text: 'doggy foo', // plain text
    html: '<b>doggy foo</b>'//html
  }; // end mailOptions

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
  sendEmail();
  res.send(req.body);
}); // end post

module.exports = router;
