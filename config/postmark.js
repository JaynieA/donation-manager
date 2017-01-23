/**
  * @module config/postmark
  * Postmark API credentials that allows the application to
  * send emails with the Postmark API through nodemailer .
*/
var postmark = {
  user: process.env.POSTMARK_KEY,
  pass: process.env.POSTMARK_KEY,
  email: process.env.POSTMARK_EMAIL
}; // end postmark

module.exports = postmark;
