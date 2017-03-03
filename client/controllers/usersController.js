//Users Controller
myApp.controller('UsersController', ['$http', '$scope', '$location', 'AuthFactory', function($http, $scope, $location, AuthFactory) {
  if (verbose) console.log('loaded UsersController');
  //declare authFactory
  var authFactory = AuthFactory;
  var authorized = authFactory.checkLoggedIn();
  if (verbose) console.log('AUTH in UC-->',authorized);
  //Initialize scope variables
  $scope.allUsers = [];

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

  var getUsers = function() {
    if (verbose) console.log('in getUsers');
    $http({
      method: 'GET',
      url: '/private/users'
    }).then(function(response) {
      if (verbose) console.log('get users response-->',response.data.users);
      //scope all users
      $scope.allUsers = response.data.users;
    }).catch(function(err) {
      if (verbose) console.log(err);
    }); // end catch
  }; // end getUsers

  var init = function() {
    if (verbose) console.log('in init');
    getUsers();
  }; // end init

  confirmAuth();

}]); // end UsersController
