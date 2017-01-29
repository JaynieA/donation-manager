//Dashboard Controller
myApp.controller('DashboardController', ['AuthFactory','$scope', '$http','$location', '$timeout',
 function(AuthFactory, $scope, $http, $location, $timeout) {
  if (verbose) console.log('in DashboardController');

  //declare authFactory
  var authFactory = AuthFactory;
  var authorized = authFactory.checkLoggedIn();
  if (verbose) console.log('AUTH in DC-->',authorized);

  var convertToMonthName = function(monthNumber) {
    //takes a month number and returns the name of that month
    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'];
    return months[monthNumber];
  }; // end convertToMonthName

  var generatePDF = function(donationObject) {
    if (verbose) console.log('in generatePDF', donationObject);
    $http({
      method: 'PUT',
      url: '/private/pdf',
      data: donationObject
    }).then(function(response) {
      if (verbose) console.log('generate PDF response-->',response);
      //use the printJS library and /private/docs router
      //to serve newly created file in a print window
      //TODO: look for a different library to serve the pdf file in an iframe
      //      in order to make this next http call unnecessary
      // $http({
      //   url: '/private/docs/NewDoc',
      //   method: 'GET'
      // }).then(function(response) {
      //   printJS({ printable: '/private/docs/NewDoc', type:'pdf'});
      //   updateThankedStatus(donationObject._id);
      // });
      //Wait to seconds for pdf to generate, then call it in print window
      $timeout(function() {
        printJS({ printable: '/private/docs/NewDoc', type:'pdf'});
        updateThankedStatus(donationObject._id);
      }, 2000);
    }); // end $http
  }; // end generatePDF

  var getAuthStatus = function() {
    //get authentication that user is logged in and has admin status
    $http.get('/private/dashboard')
      .then(function (response) {
      //if the authStatus is not true...
      if (response.data.authStatus !== true) {
        if (verbose) console.log('Sorry, you are not logged in.');
        $scope.data = false;
        //redirect to the login page
        $location.path("/#!/login");
      } else {
        //else (if user is authed)...
        //run init function
        init();
        //show them the page
        $scope.data = response.data.authStatus;
        if (verbose) console.log('DC. You are logged in:', response.data.authStatus);
      } // end else
    }); // end $http
  }; // end getAuthStatus

  var confirmAuth = function() {
    if (verbose) console.log('in confirmAuth');
    //confirm that the user is authorized
    if (authorized) {
      //initialize the view
      init();
      //show the view to the user
      $scope.data = authorized;
      if (verbose) console.log('DC. You are logged in:', authorized);
    } else {
      if (verbose) console.log('Sorry, you are not logged in.');
      //do not show the view
      $scope.data = false;
      //redirect to the login page
      $location.path("/#!/login");
    } // end else
  }; // end

  var getDonations = function() {
    if (verbose) console.log('in getDonations');
    $http.get('/private/dashboard/donations')
      .then(function(response) {
        $scope.donations = response.data.donations;
        $scope.isThanking = true;
      }); // end $http
  }; // end getDonations

  var getDonationDates = function() {
    if (verbose) console.log('in getDonationDates');
    //get aggregate dates of all donations
    $http.get('/private/dashboard/dates')
      .then(function(response) {
        if (verbose) console.log('get dates response');
        //set fiter select values
        var monthsArray = getMonths(response.data);
        $scope.allMonths = makeMonthsObject(monthsArray);
        var yearsArray = getYears(response.data);
        $scope.allYears = makeYearObjects(yearsArray);
    }); // end $http
  }; // end getDonationDates

  var getMonths = function(dateObject) {
    console.log('in getMonths-->', dateObject);
    var months = [];
    for (var i = 0; i < dateObject.length; i++) {
      //if month is not already in months array, push it in
      if (months.indexOf(dateObject[i].month) === -1) {
        months.push(dateObject[i].month);
      } // end if
    } // end for
    //sort the number in the array in ascending order
    months = months.sort(function(a, b){return a-b;});
    if (verbose) console.log('months array after sort-->',months);
    return months;
  }; // end getMonths

  var getYears = function(dateObject) {
    console.log('in getYears');
    var years = [];
    for (var i = 0; i < dateObject.length; i++) {
      //if year is not already in years array, push it in
      if (years.indexOf(dateObject[i].year) === -1) {
        years.push(dateObject[i].year);
      } // end if
    } // end for
    //sort the numbers in the array in desending order
    years = years.sort(function(a, b){return b-a;});
    if (verbose) console.log('years array after sort-->', years);
    return years;
  }; // end getYears

  var init = function() {
    if (verbose) console.log('in init');

    //get donations to populate table
    getDonations();
    //get donation dates for select filter
    getDonationDates();
    //set filter defaults
    $scope.statusArray = [
      {value: true,
      display: 'Thanked'},
      {value: false,
      display: 'Not Thanked'}
    ]; // end statusArray
    //initiate all filter to 'off'
    $scope.thankSelected = { value: undefined };
    $scope.monthSelected = { value: undefined };
    $scope.yearSelected = { value: undefined };
    //TODO: initiate thanked filter to 'Not Thanked' before deploy
    //$scope.thankSelected = { value: {value: false, display: 'Not Thanked'} };
  }; // end init

  var makeMonthsObject = function(monthsArray) {
    console.log('in makeMonthsObject', monthsArray);
    //declare empty array to store all month objects
    var allMonthObjects = [];
    //loop through monthsArray and create month objects
    for (var i = 0; i < monthsArray.length; i++) {
      var monthObject = {
        month_num: Number(monthsArray[i]) - 1,
        month_str: convertToMonthName(monthsArray[i])
      }; // end monthObject
      //push the object into allMonthObjects array
      allMonthObjects.push(monthObject);
    } // end for
    if (verbose) console.log(allMonthObjects);
    return allMonthObjects;
  }; // end makeMonthsObject

  var makeYearObjects = function(yearsArray) {
    console.log('in makeYearsObjects', yearsArray);
    var allYears = [];
    for (var i = 0; i < yearsArray.length; i++) {
      var newYear = {
        year: yearsArray[i]
      }; // end newYear
      //push year object into allYears array
      allYears.push(newYear);
    } // end for
    if (verbose) console.log('ALL YEARS-->',allYears);
    return allYears;
  }; // end makeYearsObjects

  var sendEmail = function(donation) {
    if (verbose) console.log('in sendEmail', donation);
    var objectToSend = {
      donor_name: donation.donor_name,
      donor_email: donation.donor_email,
      donation_amt: donation.donation_amt
    }; // end objectToSend
    $http({
      method: 'POST',
      url: '/private/email',
      data: objectToSend
    }).then(function(response) {
      if (verbose) console.log('send email response-->',response.data);
      //update thanked status for this donation
      updateThankedStatus(donation._id);
    }); // end $http
  }; // end getEmails

  $scope.thank = function(donationObject) {
    if (verbose) console.log('in thank', donationObject._id);
    //show loading spinner while thanking
    $scope.isThanking = donationObject._id;
    var donation = donationObject;
    //if both are blank, or they are anonymous
    if (donation.donor_email === 'anonymous') {
      //set the status of this donation to thanked
      updateThankedStatus(donation._id);
    //if the donation email is blank but address is present, generate PDF
    } else if (!donation.donor_email &&  donation.donor_address) {
      generatePDF(donationObject);
    //if the donation email is present, send an email
    } else if (donation.donor_email) {
      sendEmail(donation);
    } else {
      //TODO:  handle cases where none of these are true;
      alert('error');
    } // end else
  }; // end thank

  var updateThankedStatus = function(id) {
    if (verbose) console.log('in updateThankedStatus', id);
    $http({
      method: 'PUT',
      url: '/private/dashboard/thank',
      data: {id: id}
    }).then(function(response) {
      if (verbose) console.log(response);
      //update donations on page
      //TODO: handle how this works if user has filters applied
      getDonations();
    }); // end $http
  }; // end updateThankedStatus

  //make sure user it authorized
  //if they are, show them the view and run init function
  confirmAuth();

}]); // end DashboardController
