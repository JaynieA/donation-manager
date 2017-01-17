/**
 * We configure our instance of passport in this file.
 * Serialize & Deserialize user info
 * In addition, we define our authentication strategy in this file.
 */

// Require Node Modules
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// Require Custom App Modules
var config = require('../config/auth');

// all db queries moved to a service layer, necessary for proper unit testing
var AdminStrategy = require('../strategies/adminStrategy');

// Passport Session Serialization
// Serialize the user onto the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
}); // end serializeUser

// Deserialize the user from the session and provide user object
passport.deserializeUser(function (id, done) {
  AdminStrategy.findAdminById(id, function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  }); // end findAdminById
}); // end deserializeUser

// Passport Strategy Definition
passport.use('google', new GoogleStrategy({
  // identify ourselves to Google and request Google user data
  clientID: config.googleAuth.clientId,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackUrl,
}, function (token, refreshToken, profile, done) {
  // Google has responded
  // does this user exist in our database already?
  AdminStrategy.findAdminByGoogleId(profile.id, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) { // user does exist!
        return done(null, user);
      }
      // user does not exist in our database, let's create one!
      AdminStrategy.createGoogleAdmin(profile.id, token, profile.displayName,
        profile.emails[0].value, /* we take first email address */
        function (err, user) {
          if (err) {
            return done(err);
          }
          return done(null, user);
        }); // end createGoogleAdmin
    }); // end findAdminByGoogleId
})); // end use

module.exports = passport;
