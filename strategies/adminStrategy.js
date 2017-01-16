/**
 * A strategy layer that makes all of our Admin database queries.
 *
 * @module strategies/Admin
 *
 * @function findAdminById finds a Admin by their unique Mongo id
 * @function findAdminByGoogleId finds a Admin by their Google id
 * @function create a Admin that will be authenticated by Google
 */
var Admin = require('../models/Admin');

var AdminService = {
  findAdminById: function (id, callback) {
    Admin.findById(id, function (err, Admin) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, Admin);
    });
  },

  findAdminByGoogleId: function (id, callback) {
    Admin.findOne({ googleId: id }, function (err, Admin) {

      if (err) {
        return callback(err, null);
      }

      return callback(null, Admin);
    });
  },

  createGoogleAdmin: function (id, token, name, email, callback) {
    var Admin = new Admin();

    Admin.googleId = id;
    Admin.googleToken = token;
    Admin.googleName = name;
    Admin.googleEmail = email;

    Admin.save(function (err) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, Admin);
    });
  },
};

module.exports = AdminService;
