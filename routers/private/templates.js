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

router.post('/', function(req,res) {
  console.log(req.body);
  res.sendStatus(200);
}); // end post

module.exports = router;
