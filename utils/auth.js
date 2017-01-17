
// Middleware that checks if a user is authenticated.

module.exports = function (req, res, next) {
  // if user is authenticated in the session AND has been given admin status, complete the request
  if (req.isAuthenticated() && req.user.admin === true) {
    console.log('user is authenticated as an admin in auth.js');
    return next();
  } else {
    // if user is not authenticated, send an error message
    console.log('user is not authenticated');
    //TODO: add better error handling here
    res.json({ err: 'You have not been authenticated as an admin for this site' });
  } // end else
}; // end module.exports
