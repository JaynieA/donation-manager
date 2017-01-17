
 // A strategy layer that makes all of our Admin database queries.

var Admin = require('../models/admin');

var AdminService = {
  //findAdminById finds a Admin by their unique Mongo id
  findAdminById: function (id, callback) {
    Admin.findById(id, function (err, admin) {
      if (err) {
        return callback(err, null);
      } // end if
      return callback(null, admin);
    }); // end findById
  }, // end findAdminById

  findAdminByGoogleId: function (id, callback) {
    //findAdminByGoogleId finds a Admin by their Google id
    Admin.findOne({ googleId: id }, function (err, admin) {
      if (err) {
        return callback(err, null);
      } // end if
      return callback(null, admin);
    }); // end findOne
  }, // end findAdminByGoogleId

  //create a Admin that will be authenticated by Google
  createGoogleAdmin: function (id, token, name, email, callback) {
    var admin = new Admin();

    admin.googleId = id;
    admin.googleToken = token;
    admin.googleName = name;
    admin.googleEmail = email;
    admin.admin = false;

    admin.save(function (err) {
      if (err) {
        return callback(err, null);
      } // end if
      return callback(null, admin);
    }); // end save
  }, // end createGoogleAdmin
}; // end adminService

module.exports = AdminService;
