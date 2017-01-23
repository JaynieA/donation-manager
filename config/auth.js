/**
  * @module config/auth
  * Google Cloud API credentials that allows the application to
  * make calls to a Google API.
*/
var authConfigs = {
  googleAuth: {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL,
  }, // end googleAuth
  sessionVars: {
    secret: process.env.DM_SESSION_SECRET,
  }, // end sessionVars
}; // end authConfigs

module.exports = authConfigs;
