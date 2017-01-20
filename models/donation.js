//Donation schema for mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new Schema({
  platform_name: {type:String, required: true},
  date: Date,
  donor_name: String,
  donor_email: String,
  donation_amt: Number,
  reference_id: String,
  donor_address: String,
  donor_city: String,
  donor_state: String,
  donor_zip: Number,
  origin: String,
  thanked: {type: Boolean, default: false}
}); // end donorSchema

var Donation = mongoose.model('donations', donationSchema);

module.exports = Donation;
