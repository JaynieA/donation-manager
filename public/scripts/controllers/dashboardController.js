// //Dashboard Controller
// myApp.controller('DashboardController', ['$scope', '$http', function($scope, $http) {
//   console.log('dashboard controller');
// }]); // end DashboardController

myApp.controller('DashboardController', function ($http) {
  console.log('loaded DashboardController');
  var _this = this;
  _this.data = '';

  $http.get('/private/dashboard')
    .then(function (response) {
      if (response.data.err) {
        console.log('Sorry, you are not logged in.');
        _this.data = 'Sorry, you are not logged in!';
      } else {
        _this.data = response.data.message;
        console.log('DC. You are logged in:', response.data.message);
      }
    });
}); // end DashboardController
