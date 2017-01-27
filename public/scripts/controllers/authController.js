var verbose = false;

//Auth Controller
myApp.controller('AuthController', function (AuthFactory) {
  if (verbose) console.log('in auth controller');
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
  if (verbose) console.log('Auth Controller. logged in AND admin?', _this.loggedIn);
});
