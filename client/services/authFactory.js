var verbose = false;

myApp.factory('AuthFactory', function ($http) {
  if (verbose) console.log('in auth factory');
  var Status = {
    loggedIn: false,
  };

  // the public API
  return {
    Status: Status,

    checkLoggedIn: function () {
      return Status.loggedIn;
    },

    isLoggedIn: function () {
      return $http.get('/auth');
    },

    setLoggedIn: function (value) {
      Status.loggedIn = value;
    },

    logout: function () {
      return $http.get('/auth/logout');
    },
  };

});
