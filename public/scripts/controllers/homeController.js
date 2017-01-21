//Home Controller
myApp.controller('HomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('loaded HomeController');

  $scope.currentYear = new Date().getFullYear();



  $scope.data = '';
  //check if the user is allowed to see this page
  $http.get('/private/home')
    .then(function (response) {
      //if the authStatus is false or undefined...
      if (response.data.authStatus === undefined || response.data.authStatus === false) {
        //if not logged in/authorized as admin set data to false
        console.log('Sorry, you are not logged in.');
        $scope.data = false;
        //redirect to the login page
        $location.path("/#!/login");
      } else {
        //else, get server response of true
        $scope.data = response.data.authStatus;
        console.log('HC. You are logged in:', response.data.authStatus);
      }
  }); // end get

  var getCurrentMonth = function() {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    console.log(month[d.getMonth()]);
    return month[d.getMonth()];
  }; // end getCurrentMonth

  //Initialize slider directive
  $scope.slideChangeData = {
      start: getCurrentMonth(),
      change: 0,
      end: 0
  }; // end otherData
  $scope.month_slider = {
    value: getCurrentMonth(),
    options: {
      floor: 0,
      ceil: 12,
      showSelectionBar: true,
      stepsArray: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      showTicks: true,
      onStart: function () {
                $scope.otherData.start = $scope.month_slider.value;
      },
      onChange: function () {
          $scope.otherData.change = $scope.month_slider.value;
      },
      onEnd: function () {
          $scope.otherData.end = $scope.month_slider.value;
      }
    } // end options
  }; // end month_slider



}]);
