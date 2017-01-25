/**
 * @module private/templates
 */
var express = require('express');
var router = express.Router();
var Template = require('../../models/template');

//GET /private/templates
router.get('/', function (req, res) {
  res.send({ authStatus: true });
});

//GET /private/templates/default
//retrieves default email template text
router.get('/emailDefault', function(req,res) {
  Template.findOne({type:'email', default: true}, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    } // end else
  }); // end find
}); // end get

//GET /private/templates/letterDefault
//retrieves default letter template text
router.get('/letterDefault', function(req,res) {
  Template.findOne({type:'letter', default: true}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    } // end else
  }); // end Template
}); // end get /letterDefault

//PUT /private/templates/email
//edits the default email text
router.put('/email', function(req,res) {
  Template.update({ default: true, type:'email' },{ $set: { text: req.body.text } }, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    } // end else
  }); // end update
}); // end post

//PUT /private/templates/letter
//edits the default letter text
router.put('/letter', function(req,res) {
  Template.update({ default:true, type:'letter' }, { $set: { text: req.body.text } }, function(err,results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    } // end else
  }); // end update
}); // end post

module.exports = router;
