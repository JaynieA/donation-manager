//Home Controller
myApp.controller('HomeController', function ($http) {
  console.log('loaded HomeController');
  var _this = this;
  _this.data = '';
  //check if the user is allowed to see this page
  $http.get('/private/home')
    .then(function (response) {
      if (response.data.err) {
        //if not logged in/authorized as admin set data to false
        console.log('Sorry, you are not logged in.');
        _this.data = false;
      } else {
        //else, get server response of true
        _this.data = response.data.authStatus;
        console.log('HC. You are logged in:', response.data.authStatus);
      }
    });
});
