//Dashboard Controller
myApp.controller('DashboardController', ['$scope', '$http','$location', '$timeout', function($scope, $http, $location, $timeout) {
  if (verbose) console.log('in DashboardController');

  var condenseDateResults = function(responseArray) {
    if (verbose) console.log('in condenseDateResults');
    var dates = [];
    //push the responses into dates array (if not already in)
    for (var i = 0; i < responseArray.length; i++) {
      var dateString = responseArray[i].month + ',' + responseArray[i].year;
      //if the date is not in dates array, push it in
      if (dates.indexOf(dateString) === -1) {
        dates.push(dateString);
      } // end if
    } // end for
    return dates;
  }; // end condenseDateResults

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
        //else (if user is authed), show them the page
        $scope.data = response.data.authStatus;
        if (verbose) console.log('DC. You are logged in:', response.data.authStatus);
      } // end else
    }); // end $http
  }; // end getAuthStatus

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
        if (verbose) console.log('get dates response-->', response);
        //condense the dates returned, attach month string, and scope for select
        var condensedDates = condenseDateResults(response.data);
        $scope.selectDates = makeDateObjects(condensedDates);
        $scope.itemArray = makeDateObjects(condensedDates);
    }); // end $http
  }; // end getDonationDates

  var makeDateObjects = function(array) {
    //convert array of date strings into objects containing their data
    if (verbose) console.log('in makeDateObjects');
    var dates = [];
    for (var i = 0; i < array.length; i++) {
      //split date strings on ','
      array[i].split(',');
      //marshall variables
      var year = array[i].split(',')[1];
      var monthNum =  array[i].split(',')[0];
      var monthString = convertToMonthName(Number(monthNum));
      //construct object containing date info
      var newDate = {
        month_num: monthNum - 1,
        month_str: monthString,
        year: year
      }; // end newDate
      dates.push(newDate);
    } // end for
    return dates;
  }; // end makeDateObjects

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

  var init = function() {
    if (verbose) console.log('in init');
    //make sure user it authorized
    getAuthStatus();
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
    $scope.selected = { value: undefined };
    $scope.thankSelected = { value: undefined };
  }; // end init

  init();

}]); // end DashboardController
