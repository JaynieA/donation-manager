/**
 * Handles requests for donations
 * @module routers/private/donations
 */
var express = require('express');
var router = express.Router();
var Admin = require('../../models/admin');

//GET all users in admin collection
router.get('/', function(req,res) {
  console.log('users get route hit');
  //find all donations
  Admin.find({}, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send({ users : results });
    } // end else
  }); // end find
}); // end GET

//PUT - approve admin user by id
router.put('/', function(req,res) {
  console.log('users PUT route hit', req.body.id);
  var id = req.body.id;
  //Change admin status to true
  Admin.update({'_id': id },{ $set:{ 'admin' : true , } }, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.sendStatus(201);
    } // end else
  }); // end update
}); // end post

module.exports = router;
