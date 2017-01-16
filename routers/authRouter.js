/*
  * Handles all authentication requests including
  * login and logout.
*/

var express = require('express');
var router = express.Router();
var passport = require('../auth/passport');

router.get('/google', passport.authenticate('google',
  {
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'],
    prompt: 'select_account',
  })
);

router.get('/google/callback', passport.authenticate('google',
  {
    successRedirect: '/private', // take them to their private data
    failureRedirect: '/', // take them back home to try again
  })
);

router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.json({ status: true, name: req.user.googleName });
  } else {
    res.json({ status: false });
  }

});

router.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200); // they made it!
});

module.exports = router;
