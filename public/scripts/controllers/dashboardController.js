// //Dashboard Controller

myApp.controller('DashboardController', function ($http) {
  console.log('loaded DashboardController');
  var _this = this;
  _this.data = '';
  //get authentication that user is logged in and has admin status
  $http.get('/private/dashboard')
    .then(function (response) {
      if (response.data.err) {
        console.log('Sorry, you are not logged in.');
        _this.data = false;
      } else {
        _this.data = response.data.authStatus;
        console.log('DC. You are logged in:', response.data.authStatus);
      }
    });
}); // end DashboardController
