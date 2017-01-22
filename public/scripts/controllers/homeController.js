//Home Controller
myApp.controller('HomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('loaded HomeController');

  $scope.data = '';

  var calculateCurrentYearTotalDonations = function(responseArray) {
    console.log('in calculateCurrentYearTotalDonations');
    //initialize yearly donation total to zero
    var totalDonations = 0;
    //for each donation this year, add donation amount to total
    for (var i = 0; i < responseArray.length; i++) {
      totalDonations += responseArray[i].donation_amt;
    } // end for
    //scope the total for display
    $scope.yearTotal = totalDonations;
    return totalDonations;
  }; // end calculateCurrentYearTotalDonations

  var calculateMonthlyTotal = function(responseArray) {
    var total = 0;
    for (var i = 0; i < responseArray.length; i++) {
      total += responseArray[i].donation_amt;
    } // end for
    return total;
  }; // end

  var checkAuth = function() {
    console.log('in checkAuth');
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
  }; // end checkAuth

  var getCurrentMonth = function() {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    console.log(month[d.getMonth()]);
    return month[d.getMonth()];
  }; // end getCurrentMonth

  var getCurrentYearsDonations = function() {
    console.log('in getCurrentYearsDonations');
    $http({
      method: 'GET',
      url: '/private/home/donations'
    }).then(function(response) {
      calculateCurrentYearTotalDonations(response.data);
    }); // end $http
  }; // end getCurrentYearsDonations

  var getMonthByNumber = function(num) {
    console.log('in getMonthByNumber');
    var months = ["January", "February", "March", "April", "May", "June","July", "August",
                      "September", "October", "November", "December"];
    var month = months[num-1];
    return month;
  }; // end getMonthByNumber

  //get donation total for singular month
  var getMonthlyDonations = function(monthNum, type) {
    console.log('in getMonthlyDonations', monthNum);
    //assemble url string
    var urlString = '/private/home/monthlyTotal/' + monthNum;
    $http({
      method: 'GET',
      url: urlString
    }).then(function(response) {
        $scope.monthTotal = calculateMonthlyTotal(response.data);
        $scope.monthName = getMonthByNumber(monthNum);
    }); // end $http
  }; // end getMonthlyDonations

  var initializeSlider = function() {
    console.log('in initializeSlider');
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
        onChange: function () {
            //get the month number the slider was changed to
            $scope.slideChangeData.change = $scope.slider.value;
            //get month total donations and sipaly them
            getMonthlyDonations($scope.slider.value);
        }
      } // end options
    }; // end slider
  }; // end initializeSlider

  //initialize the view
  var init = function() {
    console.log('in init');
    checkAuth();
    //get the current year
    $scope.currentYear = new Date().getFullYear();
    //initialize the slider
    initializeSlider();
    //get monthly donations for current month
    var currentMonthNum = new Date().getMonth() + 1;
    getMonthlyDonations(currentMonthNum);
  }; // end init

  init();




}]);
