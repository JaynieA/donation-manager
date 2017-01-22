/**
 * Handles the sending of emails
 * @module private/email
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// POST
router.post('/', function(req,res) {
  console.log(req.body);
  res.send(req.body);
}); // end post

module.exports = router;
