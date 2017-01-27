var verbose = false;

//Templates Controller

myApp.controller('TemplatesController', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
  if (verbose) console.log('loaded TemplatesController');

  var getAuthStatus = function() {
    if (verbose) console.log('in getAuthStatus');
    //get authentication that user is logged in and has admin status
    $http.get('/private/templates')
      .then(function (response) {
        //if the authStatus is false or undefined...
        if (response.data.authStatus === undefined || response.data.authStatus === false) {
          if (verbose) console.log('Sorry, you are not logged in.');
          $scope.data = false;
          //redirect to the login page
          $location.path("/#!/login");
        } else {
          $scope.data = response.data.authStatus;
          if (verbose) console.log('TC. You are logged in:', response.data.authStatus);
        } // end else
      }); // end $http
  }; // end getAuthStatus

  var getDefaultEmailTemplate = function() {
    if (verbose) console.log('in getDefaultEmailTemplate');
    $http({
      method: 'GET',
      url: '/private/templates/emailDefault'
    }).then(function(response) {
      if (verbose) console.log('getDefaultEmailTemplate response-->',response);
      //set the template email display
      $scope.template.email = response.data.text;
    }); // end $http
  }; // end getDefaultEmailTemplate

  var getDefaultLetterTemplate = function() {
    if (verbose) console.log('in getDefaultLetterTemplate');
    $http({
      method: 'GET',
      url: '/private/templates/letterDefault'
    }).then(function(response) {
      if (verbose) console.log('getDefaultLetterTemplate response -->', response);
      $scope.template.letter = response.data.text;
    }); // end $http
  }; // end getDefaultLetterTemplate

  $scope.updateEmailTemplate = function() {
    if (verbose) console.log('in updateEmailTemplate', $scope.template.email);
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
      if (verbose) console.log(response);
      //show the success alert for a few seconds
      blinkSuccessAlert();
    }); // end $http
  }; // end updateEmailTemplate

  $scope.updateLetterTemplate = function() {
    if (verbose) console.log('in updateLetterTemplate', $scope.template.letter);
    //assemble object to send
    var objectToSend = {
      type: 'letter',
      default: true,
      text: $scope.template.letter
    }; // end objectToSend
    $http({
      method: 'PUT',
      url: '/private/templates/letter',
      data: objectToSend
    }).then(function(response) {
      if (verbose) console.log(response);
      //show the success alert for a few seconds
      blinkSuccessAlert();
    }); // end $http
  }; // end updateLetterTemplate

  var blinkSuccessAlert = function() {
    if (verbose) console.log('in hideAlert');
    //show saved alert
    $scope.saveSuccess = true;
    //re-hide saved alert after a few seconds
    $timeout(function () { $scope.saveSuccess = false; }, 3000);
  }; // end hideAlert

  var init = function() {
    if (verbose) console.log('in init');
    $scope.data = '';
    $scope.saveSuccess = false;
    getAuthStatus();
    getDefaultEmailTemplate();
    getDefaultLetterTemplate();
    //define object to handle child scopes
    $scope.template = {};
  }; // end init

  init();

}]); // end TemplatesController
