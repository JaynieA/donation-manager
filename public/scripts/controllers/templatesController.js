//Templates Controller

myApp.controller('TemplatesController', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
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

  var getTemplates = function() {
    console.log('in getTemplates');
    $http({
      method: 'GET',
      url: '/private/templates/emailDefault'
    }).then(function(response) {
      console.log('getTemplates response-->',response);
      //set the template email display
      $scope.template.email = response.data.text;
    }); // end $http
  }; // end getTemplates

  $scope.updateEmailTemplate = function() {
    console.log('in updateEmailTemplate', $scope.template.email);
    //assemble object to send
    var objectToSend = {
      type: 'email',
      default: false,
      text: $scope.template.email,
    }; // end objectToSend
    //post info to the server
    $http({
      method: 'PUT',
      url: '/private/templates/email',
      data: objectToSend
    }).then( function(response) {
      console.log(response);
      //show the success alert

      hideAlert();

    }); // end $http
  }; // end updateEmailTemplate

  var hideAlert = function() {
    console.log('in hideAlert');
    //show saved alert
    $scope.saveSuccess = true;
    //re-hide saved alert after a few seconds
    $timeout(function () { $scope.saveSuccess = false; }, 3000);
  }; // end hideAlert

  var init = function() {
    console.log('in init');
    $scope.data = '';
    $scope.saveSuccess = false;
    getAuthStatus();
    getTemplates();
    $scope.template = {
      //email: "Email template stuff goes here"
    };
  }; // end init

  init();

}]); // end TemplatesController
