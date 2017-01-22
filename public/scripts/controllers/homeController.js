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
        getCurrentYearsDonations();
      } // end else
  }); // end get

  var getCurrentYearsDonations = function() {
    console.log('in getCurrentYearsDonations');
    $http({
      method: 'GET',
      url: '/private/home/donations'
    }).then(function(response) {
      calculateCurrentYearTotalDonations(response.data);
    }); // end $http
  }; // end getCurrentYearsDonations

  var calculateCurrentYearTotalDonations = function(responseArray) {
    console.log('in calculateCurrentYearTotalDonations', responseArray);
    var totalDonations = 0;
    for (var i = 0; i < responseArray.length; i++) {
      totalDonations += responseArray[i].donation_amt;
    } // end for
    console.log(totalDonations);
    $scope.yearTotal = totalDonations;
    return totalDonations;
  }; // end calculateCurrentYearTotalDonations

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
  $scope.slider = {
    value: getCurrentMonth(),
    options: {
      floor: 0,
      ceil: 12,
      showSelectionBar: true,
      stepsArray: [
          {value: 1, legend: 'Jan'},
          {value: 2, legend: 'Feb'},
          {value: 3, legend: 'Mar'},
          {value: 4, legend: 'Apr'},
          {value: 5, legend: 'May'},
          {value: 6, legend: 'Jun'},
          {value: 7, legend: 'Jul'},
          {value: 8, legend: 'Aug'},
          {value: 9, legend: 'Sep'},
          {value: 10, legend: 'Oct'},
          {value: 11, legend: 'Nov'},
          {value: 12, legend: 'Dec'}
        ],
      showTicks: true,
      onStart: function () {
                $scope.slideChangeData.start = $scope.slider.value;
      },
      onChange: function () {
          $scope.slideChangeData.change = $scope.slider.value;
      },
      onEnd: function () {
          $scope.slideChangeData.end = $scope.slider.value;
      }
    } // end options
  }; // end slider





}]);
