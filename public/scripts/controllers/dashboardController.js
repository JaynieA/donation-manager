// //Dashboard Controller

myApp.controller('DashboardController', ['$scope', '$http','$location', function($scope, $http, $location) {
  console.log('in DashboardController');

  //get authentication that user is logged in and has admin status
  $http.get('/private/dashboard')
    .then(function (response) {
    //if the authStatus is false or undefined...
    if (response.data.authStatus === undefined || response.data.authStatus === false) {
      console.log('Sorry, you are not logged in.');
      $scope.data = false;
      //redirect to the login page
      $location.path("/#!/login");
    } else {
      $scope.data = response.data.authStatus;
      console.log('DC. You are logged in:', response.data.authStatus);
      $scope.donations = response.data.donations;
    } // end else

  }); // end $http

}]); // end DashboardController
