
// Middleware that checks if a user is authenticated.

module.exports = function (req, res, next) {
  // if user is authenticated in the session, complete the request
  if (req.isAuthenticated()) {
    console.log('user is authenticated');
    return next();
  } else {
    // if user is not authenticated, send an error message
    console.log('user is not authenticated');
    res.json({ err: 'User is not authenticated' });
  } // end else
}; // end module.exports
