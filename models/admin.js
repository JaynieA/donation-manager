// Admin schema for mongoose

var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
  googleId: { type: String, required: true },
  googleToken: { type: String, required: true },
  googleEmail: { type: String, required: true },
  googleName: { type: String },
  //app administrator will need to manually set users to admin status
  admin: {type: Boolean, required: true}
}); // end adminSchema

//save and export the adminSchema model
module.exports = mongoose.model('Admin', adminSchema);
