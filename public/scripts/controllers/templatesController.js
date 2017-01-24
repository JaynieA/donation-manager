//Templates Controller

myApp.controller('TemplatesController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('loaded TemplatesController');

  var getAuthStatus = function() {
    console.log('in getAuthStatus');
    //get authentication that user is logged in and has admin status
    $http.get('/private/templates')
      .then(function (response) {
        //if the authStatus is false or undefined...
        if (response.data.authStatus === undefined || response.data.authStatus === false) {
          console.log('Sorry, you are not logged in.');
          $scope.data = false;
          //redirect to the login page
          $location.path("/#!/login");
        } else {
          $scope.data = response.data.authStatus;
          console.log('TC. You are logged in:', response.data.authStatus);
        } // end else
      }); // end $http
  }; // end getAuthStatus

  var init = function() {
    console.log('in init');
    $scope.data = '';
    getAuthStatus();
  }; // end init

  init();

}]); // end TemplatesController
