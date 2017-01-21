// //Dashboard Controller

myApp.controller('DashboardController', ['$scope', '$http','$location', function($scope, $http, $location) {
  console.log('in DashboardController');

  //get authentication that user is logged in and has admin status
  $http.get('/private/dashboard')
    .then(function (response) {
    //if the authStatus is not true...
    if (response.data.authStatus !== true) {
      console.log('Sorry, you are not logged in.');
      $scope.data = false;
      //redirect to the login page
      $location.path("/#!/login");
    } else {
      //else (if user is authed), show them the page
      $scope.data = response.data.authStatus;
      console.log('DC. You are logged in:', response.data.authStatus);
      $scope.donations = response.data.donations;
    } // end else
  }); // end $http

  //get aggregate dates of all donations
  $http.get('/private/dashboard/dates')
    .then(function(response) {
      condenseDateResponse(response.data);
  }); // end $http

  var condenseDateResponse = function(responseArray) {
    console.log('in condenseDateResponse');
    var dates = [];
    //push the responses into dates array (if not already in)
    for (var i = 0; i < responseArray.length; i++) {
      //convert month number to month string
      responseArray[i].monthString = convertMonth(responseArray[i].month);
      var dateString = responseArray[i].month + ', ' + responseArray[i].year;
      //if the date is not in dates array, push it in
      if (dates.indexOf(dateString) === -1) {
        console.log('not in array-->',dateString);
        dates.push(dateString);
      } // end if
    } // end for
    console.log('condensed dates-->',dates);
  }; // end condenseDateResponse

  //convert month from number to string
  var convertMonth = function(monthNumber) {
    switch (monthNumber) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 12:
        return 'December';
      default:
        return 'Error';
    } // end switch
  }; // end convertMonth


}]); // end DashboardController
