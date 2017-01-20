//Donor schema for mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var donorSchema = new Schema({
  platform_name: {type:String, required: true},
  date: Date,
  donor_name: String,
  donor_email: String,
  dontion_amt: Number,
  donor_address: String,
  donor_city: String,
  donor_state: String,
  donor_zip: Number,
  thanked: {type: Boolean, default: false},
}); // end donorSchema

var Donor = mongoose.model('donors', donorSchema);

module.exports = Donor;
