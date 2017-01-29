//Home Controller
myApp.controller('HomeController', ['DonationFactory', 'AuthFactory', '$scope', '$location',
 function (DonationFactory, AuthFactory, $scope, $location) {

  if (verbose) console.log('loaded HomeController');

  $scope.data = false;
  //declare donationFactory
  var donationFactory = DonationFactory;
  //declare authFactory
  var authFactory = AuthFactory;
  //check if user is authorized, declare authorized variable
  // NOTE: only updated on page load
  var authorized = authFactory.checkLoggedIn();
  if (verbose) console.log('AUTH FROM HC-->',authorized);

  var calculateCurrentYearTotalDonations = function(responseArray) {
    if (verbose) console.log('in calculateCurrentYearTotalDonations');
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
    //responseArray contains all donations from x month
    var total = 0;
    //calculate total donations in responseArray
    for (var i = 0; i < responseArray.length; i++) {
      total += responseArray[i].donation_amt;
    } // end for
    return total;
  }; // end

  var checkAuth = function() {
    if (verbose) console.log('in checkAuth');
    //if the user is authorized
    if (authorized) {
      //initialize the view
      init();
      //show the view to the user
      $scope.data = authorized;
      if (verbose) console.log('HC. You are logged in:', authorized);
    } else { // if the user is not authorized
      if (verbose) console.log('Sorry, you are not logged in.');
      //do not show the view
      $scope.data = false;
      //redirect to the login page
      $location.path("/#!/login");
    } // end else
  }; // end checkAuth

  var getCurrentMonth = function() {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    if (verbose) console.log(month[d.getMonth()]);
    return month[d.getMonth()];
  }; // end getCurrentMonth

  var getCurrentYearsDonations = function() {
    if (verbose) console.log('in getCurrentYearsDonations');
    //get current years donations (from donationFactory)
    donationFactory.getCurrentYearsDonations()
    .then(function(response) {
      if (verbose) console.log('get current year donations response-->', response.data);
      //calculate and display this year's donation total
      calculateCurrentYearTotalDonations(response.data);
    }).catch(function(err) {
      if (verbose) console.log(err);
    }); // end $http
  }; // end getCurrentYearsDonations

  var getMonthlyDonations = function(monthNum) {
    if (verbose) console.log('in getMonthlyDonations');
    //get monthly donations (from donationFactory)
    donationFactory.getMonthlyDonations(monthNum)
    .then(function(response) {
      if (verbose) console.log('get montly donations response-->', response.data);
      //calculate total donations in monthNum for display
      $scope.monthTotal = calculateMonthlyTotal(response.data);
      //get month name as string for display
      $scope.monthName = getMonthByNumber(monthNum);
    }).catch(function(err) {
      if (verbose) console.log(err);
    }); // end getMonthlyDonations
  }; // end getMonthlyDonations

  var getMonthByNumber = function(num) {
    if (verbose) console.log('in getMonthByNumber');
    //get the name of a month from the month number
    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June','July', 'August',
                      'September', 'October', 'November', 'December'];
    var month = months[num];
    return month;
  }; // end getMonthByNumber

  var init = function() {
    if (verbose) console.log('in init');
    //get the current year
    $scope.currentYear = new Date().getFullYear();
    //initialize the slider
    initializeSlider();
    //get monthly donations for current month
    var currentMonthNum = new Date().getMonth() + 1;
    //get & then display donation total for current month
    getMonthlyDonations(currentMonthNum);
  }; // end init

  var initializeSlider = function() {
    if (verbose) console.log('in initializeSlider');
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
            //get total donation amount from selected month and display it
            getMonthlyDonations($scope.slider.value);
        } // end onChange
      } // end options
    }; // end slider
  }; // end initializeSlider

  //check that the user is authorized
  //if they are, show them the view and run the init function
  checkAuth();

}]);
