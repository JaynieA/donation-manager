/**
 * @module private/templates
 */
var express = require('express');
var router = express.Router();
var Template = require('../../models/template');
/**
 * GET /private/templates
 */

router.get('/', function (req, res) {
  res.send({ authStatus: true });
});

//GET default email template
router.get('/default', function(req,res) {
  Template.findOne({type: 'email', default: true}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    } // end else
  }); // end find
}); // end get

router.post('/', function(req,res) {
  console.log(req.body);
  var newTemplate = new Template(req.body);
  newTemplate.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    } // end else
  }); // end save
}); // end post

module.exports = router;
