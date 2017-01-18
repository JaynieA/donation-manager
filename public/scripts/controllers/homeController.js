//Home Controller
myApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
  console.log('loaded HomeController');

  $scope.data = '';
  //check if the user is allowed to see this page
  $http.get('/private/home')
    .then(function (response) {
      if (response.data.err) {
        //if not logged in/authorized as admin set data to false
        console.log('Sorry, you are not logged in.');
        $scope.data = false;
      } else {
        //else, get server response of true
        $scope.data = response.data.authStatus;
        console.log('HC. You are logged in:', response.data.authStatus);
      }
  }); // end get

}]);
