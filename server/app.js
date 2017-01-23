var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
//Require custom app modules
var configs = require('../config/auth');
var passport = require('../auth/passport');
var isLoggedIn = require('../utils/auth');
var private = require('../routers/private/index');

//db connection
var mongoose = require('mongoose');
var connection = require('../config/connection.js');
mongoose.connect(connection);

// SESSION CREATION AND STORAGE
 // * Creates session that will be stored in memory.
 // TODO: Before deploying to production,
 // configure session store to save to DB instead of memory (default).
app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));


//SERVE THE PDF WHEN CALLED FOR
//TODO: move this into its own router (under private?)
var path = require('path');
app.get('/docs/NewDoc.pdf', function(req, res) {
  console.log('get doc route hit');
  res.sendFile(path.join(__dirname, '../docs', 'NewDoc.pdf'));
}); // end get

// PASSPORT
app.use(passport.initialize()); // kickstart passport
// Alters request object to include user object.
app.use(passport.session());

//spin up server
app.listen(PORT, function() {
  console.log('server listening on', PORT);
}); // end listen

//uses
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//base url
var index = require('../routers/indexRouter');
app.use('/', index);

//ROUTERS
var auth = require('../routers/authRouter');
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);

module.exports = app;
