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
  thanked: {type: Boolean, default: false},
  donation_month: {type: Number, required: true},
  donation_year: {type: Number, required: true}
}); // end donorSchema

// donationSchema.index({ platform_name: 1, date: 1, donor_name:1, donor_email:1,
//                        donation_amt:1, reference_id:1, donor_address:1, donor_city:1, donor_state:1,
//                        donor_zip:1, origin:1}, { unique: true });

var Donation = mongoose.model('donations', donationSchema);

module.exports = Donation;
