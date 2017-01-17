myApp.controller('HomeController', function ($http) {
  console.log('loaded HomeController');
  var _this = this;
  console.log(_this);
  _this.data = '';

  $http.get('/private/home')
    .then(function (response) {
      console.log('home controller response:', response);
      if (response.data.err) {
        _this.data = 'Sorry, you are not logged in!';
      } else {
        _this.data = response.data.message;
      }
    });
});
