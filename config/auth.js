/** Google Cloud API credentials that allows the application to
  * make calls to a Google API. */
  var authConfigs = {
    googleAuth: {
      clientId: '612305561514-e2flgvi7s2vf5f1ipcllv618trvu445q.apps.googleusercontent.com',
      clientSecret: 'WKVVRitgoSEAm2TObcnFKNA7',
      callbackUrl: 'http://localhost:8080/auth/google/callback',
    }, // end googleAuth
    sessionVars: {
      secret: 'donman-secret',
    }, // end sessionVars
  }; // end authConfigs

module.exports = authConfigs;
