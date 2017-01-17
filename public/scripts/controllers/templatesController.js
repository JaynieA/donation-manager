//Templates Controller

myApp.controller('TemplatesController', function ($http) {
  console.log('loaded TemplatesController');
  var _this = this;
  _this.data = '';

  $http.get('/private/templates')
    .then(function (response) {
      if (response.data.err) {
        console.log('Sorry, you are not logged in.');
        _this.data = 'Sorry, you are not logged in!';
      } else {
        _this.data = response.data.message;
        console.log('TC. You are logged in:', response.data.message);
      }
    });
}); // end TemplatesController
