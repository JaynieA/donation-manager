// Admin schema for mongoose

var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
  googleId: { type: String, required: true },
  googleToken: { type: String, required: true },
  googleEmail: { type: String, required: true },
  googleName: { type: String, required: true },
  //app administrator will need to manually set users to admin status
  admin: {type: Boolean, default: false}
}); // end adminSchema

//save and export the adminSchema model
module.exports = mongoose.model('Admin', adminSchema);
