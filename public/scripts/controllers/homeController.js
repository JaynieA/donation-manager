//Home Controller
myApp.controller('HomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('loaded HomeController');

  $scope.data = '';
  //check if the user is allowed to see this page
  $http.get('/private/home')
    .then(function (response) {
      //if the authStatus is false or undefined...
      if (response.data.authStatus === undefined || response.data.authStatus === false) {
        //if not logged in/authorized as admin set data to false
        console.log('Sorry, you are not logged in.');
        $scope.data = false;
        //redirect to the login page
        $location.path("/#!/login");
      } else {
        //else, get server response of true
        $scope.data = response.data.authStatus;
        console.log('HC. You are logged in:', response.data.authStatus);
      }
  }); // end get

}]);
