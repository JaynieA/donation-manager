//Template schema for mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var templateSchema = new Schema({
  type: {type: String, required: true},
  default: {type: Boolean, required: true, default: false},
  text: {type: String}
}); // end donorSchema

var Template = mongoose.model('templates', templateSchema);

module.exports = Template;
