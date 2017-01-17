//Auth Controller
myApp.controller('AuthController', function (AuthFactory) {
  console.log('in auth controller');
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
  console.log('Auth Controller. logged in?', _this.loggedIn);
});
