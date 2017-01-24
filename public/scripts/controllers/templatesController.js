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

  $scope.saveTemplate = function() {
    console.log('in saveTemplate', $scope.template.email);
    //assemble object to send
    var objectToSend = {
      type: 'email',
      default: true,
      text: $scope.template.email,
    }; // end objectToSend
    //post info to the server
    $http({
      method: 'POST',
      url: '/private/templates',
      data: objectToSend
    }).then( function(response) {
      console.log(response);
    }); // end $http
  }; // end saveTemplate

  var init = function() {
    console.log('in init');
    $scope.data = '';
    getAuthStatus();
    $scope.template = {
      email: "Email template stuff goes here"
    };
  }; // end init

  init();

}]); // end TemplatesController
