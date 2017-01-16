var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var donorSchema = new Schema({
  date: Date,
  first_name: String,
  last_name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  net_amount: { type: Number, required: true },
  platform_name: { type: String, required: true },
  thanked: {type: Boolean, default: false},
}); // end donorSchema

var Donor = mongoose.model('donors', donorSchema);

module.exports = Donor;
