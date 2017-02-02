//Users Controller
myApp.controller('UsersController', ['$http', '$scope', '$location', 'AuthFactory', function($http, $scope, $location, AuthFactory) {
  console.log('loaded UsersController');
  //declare authFactory
  var authFactory = AuthFactory;
  var authorized = authFactory.checkLoggedIn();
  //if (verbose)
  console.log('AUTH in DC-->',authorized);

  var confirmAuth = function() {
    if (verbose) console.log('in confirmAuth');
    //confirm that the user is authorized
    if (authorized) {
      //initialize the view
      init();
      //show the view to the user
      $scope.data = authorized;
      if (verbose) console.log('DC. You are logged in:', authorized);
    } else {
      if (verbose) console.log('Sorry, you are not logged in.');
      //do not show the view
      $scope.data = false;
      //redirect to the login page
      $location.path("/#!/login");
    } // end else
  }; // end

  var init = function() {
    console.log('in init');
  }; // end init

  confirmAuth();

}]); // end UsersController
