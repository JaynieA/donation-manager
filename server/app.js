var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//db connection
//TODO: this can probably be used in routers only once those exist
var mongoose = require('mongoose');
var connection = require('../modules/connection.js');
mongoose.connect(connection);

//spin up server
app.listen(PORT, function() {
  console.log('server listening on', PORT);
}); // end listen

//uses
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//ROUTERS
app.get('/auth', function(req,res) {
  res.sendStatus(200);
}); // end auth get

//base url
var index = require('../routers/indexRouter');
app.use('/', index);

module.exports = app;
