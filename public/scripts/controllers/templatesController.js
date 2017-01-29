//Templates Controller

myApp.controller('TemplatesController', ['AuthFactory', '$scope', '$http', '$location', '$timeout',
 function (AuthFactory, $scope, $http, $location, $timeout) {
  if (verbose) console.log('loaded TemplatesController');

  //declare authFactory
  var authFactory = AuthFactory;
  //declare authorized variable
  //reflects if user is authorized
  var authorized = authFactory.checkLoggedIn();
  if (verbose) console.log('AUTH FROM TC-->',authorized);

  var blinkSuccessAlert = function() {
    if (verbose) console.log('in hideAlert');
    //show saved alert
    $scope.saveSuccess = true;
    //re-hide saved alert after a few seconds
    $timeout(function () { $scope.saveSuccess = false; }, 3000);
  }; // end hideAlert

  var checkAuth = function() {
    if (verbose) console.log('in checkAuth');
    //if the user is authorized
    if (authorized) {
      //initialize the view
      init();
      //show the view to the user
      $scope.data = authorized;
      if (verbose) console.log('TC. You are logged in:', authorized);
    } else { // if the user is not authorized
      if (verbose) console.log('Sorry, you are not logged in.');
      //do not show the view
      $scope.data = false;
      //redirect to the login page
      $location.path("/#!/login");
    } // end else
  }; // end checkAuth

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

  var init = function() {
    if (verbose) console.log('in init');
    $scope.data = '';
    $scope.saveSuccess = false;
    getDefaultEmailTemplate();
    getDefaultLetterTemplate();
    //define object to handle child scopes
    $scope.template = {};
  }; // end init

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

  //make sure the user is authorized
  //if they are, display view and run init function
  checkAuth();

}]); // end TemplatesController
