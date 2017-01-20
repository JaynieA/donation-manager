// //Dashboard Controller

myApp.controller('DashboardController', ['$scope', '$http', function($scope, $http) {
  console.log('in DashboardController');

  //get authentication that user is logged in and has admin status
  $http.get('/private/dashboard')
    .then(function (response) {
    if (response.data.err) {
      console.log('Sorry, you are not logged in.');
      $scope.data = false;
    } else {
      $scope.data = response.data.authStatus;
      console.log('DC. You are logged in:', response.data.authStatus);
      $scope.donations = response.data.donations;
    } // end else
  }); // end $http

}]); // end DashboardController
