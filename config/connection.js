/**
  * @module config/connection
  * Configure database connection
*/
var mongoose = require('mongoose');
var connStr = '';

if(process.env.MONGODB_URI !== undefined) {
    console.log('env connection string');
    connStr = process.env.MONGODB_URI;
    mongoose.defaults.ssl = true;
} else {
    connStr = 'mongodb://localhost:27017/donationManager';
} // end else

console.log("connStr set to: ", connStr);

module.exports = connStr;
