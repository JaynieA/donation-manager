var verbose = true;

myApp.controller('NavController', function (AuthFactory, $window, $scope) {
  if (verbose) console.log('in nav controller');

  //control ui.bootstrap.collapse
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;

  var _this = this;
  var authFactory = AuthFactory;
  _this.displayLogout = false; //controls display of logout option on the DOM
  _this.message = {
    text: false,
    type: 'info',
  }; // end message

  //collapse navbar when view is changed on mobile
  _this.collapseNav = function() {
    $scope.isNavCollapsed=true;
  }; // end collapseNav

  authFactory.isLoggedIn()
  .then(function (response) { //success
    if (response.data.status) {
      _this.displayLogout = true;
      authFactory.setLoggedIn(true);
      _this.username = response.data.name;
    } else { // is not logged in on server
      _this.displayLogout = false;
      authFactory.setLoggedIn(false);
    } // end else
  }, // end then
  function () { //error
    _this.message.text = 'Unable to properly authenticate user';
    _this.message.type = 'error';
  }); // end isLoggedIn

  _this.logout = function () {
    authFactory.logout()
      .then(function (response) { // success
        authFactory.setLoggedIn(false);
        _this.username = '';
        $window.location.href = '/'; // forces a page reload which updates NavController
      }, // end then
      function (response) { // error
        _this.message.text = 'Unable to logout';
        _this.message.type = 'error';
      }); // end callback
  }; // end logout

}); // end NavController
