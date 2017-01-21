//Templates Controller

myApp.controller('TemplatesController', function ($http, $location) {
  console.log('loaded TemplatesController');
  var _this = this;
  _this.data = '';
  //get authentication that user is logged in and has admin status
  $http.get('/private/templates')
    .then(function (response) {
      //if the authStatus is false or undefined...
      if (response.data.authStatus === undefined || response.data.authStatus === false) {
        console.log('Sorry, you are not logged in.');
        _this.data = false;
        //redirect to the login page
        $location.path("/#!/login");
      } else {
        _this.data = response.data.authStatus;
        console.log('TC. You are logged in:', response.data.authStatus);
      }
    });
}); // end TemplatesController
