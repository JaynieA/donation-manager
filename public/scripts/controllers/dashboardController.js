// //Dashboard Controller

myApp.controller('DashboardController', ['$scope', '$http','$location', function($scope, $http, $location) {
  console.log('in DashboardController');

  var condenseDateResults = function(responseArray) {
    console.log('in condenseDateResults');
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
    console.log('in generatePDF', donationObject);
    $http.get('/private/pdf')
      .then(function(response) {
        console.log(response);
        //use the printJS library and /private/docs router
        //to serve newly created file in a print window
        printJS({ printable: '/private/docs/NewDoc', type:'pdf'});
        //update thanked status
        updateThankedStatus(donationObject._id);
      }); // end get
  }; // end generatePDF

  var getAuthStatus = function() {
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
      } // end else
    }); // end $http
  }; // end getAuthStatus

  var getDonations = function() {
    console.log('in getDonations');
    $http.get('/private/dashboard/donations')
      .then(function(response) {
        $scope.donations = response.data.donations;
      }); // end $http
  }; // end getDonations

  var getDonationDates = function() {
    console.log('in getDonationDates');
    //get aggregate dates of all donations
    $http.get('/private/dashboard/dates')
      .then(function(response) {
        console.log('get dates response-->', response);
        //condense the dates returned, attach month string, and scope for select
        var condensedDates = condenseDateResults(response.data);
        $scope.selectDates = makeDateObjects(condensedDates);
    }); // end $http
  }; // end getDonationDates

  var makeDateObjects = function(array) {
    //convert array of date strings into objects containing their data
    console.log('in makeDateObjects');
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
        month_num: monthNum,
        month_str: monthString,
        year: year
      }; // end newDate
      dates.push(newDate);
    } // end for
    return dates;
  }; // end makeDateObjects

  var sendEmail = function(donation) {
    console.log('in sendEmail', donation);
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
      console.log('send email response-->',response.data);
      //update thanked status for this donation
      updateThankedStatus(donation._id);
    }); // end $http
  }; // end getEmails

  //set sort filter defaulst
  $scope.sortType     = 'date'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  //$scope.searchFish   = '';     // set the default search/filter term


  $scope.thank = function(donationObject) {
    console.log('in thank');
    var donation = donationObject;
    //if both are blank, or they are anonymous, alert user
    if (donation.donor_email === 'anonymous') {
      //TODO: mark as thanked anyway
      alert('this was an anonymous email');
    //if the donation email is blank but address is present, generate PDF
    } else if (!donation.donor_email &&  donation.donor_address) {
      generatePDF(donationObject);
    //if the donation email is present, send an email
    } else if (donation.donor_email) {
      //TODO: upload a case where this is true
      sendEmail(donation);
    } else {
      //TODO:  handle cases where none of these are true;
      alert('error');
    } // end else
  }; // end thank

  var updateThankedStatus = function(id) {
    console.log('in updateThankedStatus', id);
    $http({
      method: 'PUT',
      url: '/private/dashboard/thank',
      data: {id: id}
    }).then(function(response) {
      console.log(response);
      //update donations on page
      //TODO: handle how this works if user has filters applied
      getDonations();
    }); // end $http
  }; // end updateThankedStatus

  var init = function() {
    console.log('in init');
    //make sure user it authorized
    getAuthStatus();
    //get donations to populate table
    getDonations();
    //get donation dates for select filter
    getDonationDates();
  }; // end init

  init();

  // $scope.setDateFilter = function(value) {
  //   console.log('in setDateFilter');
  //   var year = new Date(value).getFullYear();
  //   var month = new Date(value).getMonth();
  //   //TODO: figure out how to correct this running on load without this hard-coded value
  //   if (year !== 1969) {
  //     console.log(month, year);
  //   }
  // }; // end setDateFilter

  // $scope.setStatusFilter = function(value) {
  //   //TODO: prevent this running on controller load
  //   if (value) {
  //     console.log('in setStatusFilter', value);
  //   } // end if
  // }; // end setStatusFilter

}]); // end DashboardController
