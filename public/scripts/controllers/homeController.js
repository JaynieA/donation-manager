myApp.controller('HomeController', function ($http) {
  console.log('loaded HomeController');
  var _this = this;
  _this.data = '';

  $http.get('/private/home')
    .then(function (response) {
      if (response.data.err) {
        console.log('Sorry, you are not logged in.');
        _this.data = 'Sorry, you are not logged in!';
      } else {
        _this.data = response.data.message;
        console.log('HC. You are logged in:', response.data.message);
      }
    });
});
