// //Dashboard Controller

myApp.controller('DashboardController', ['$scope', '$http','$location', function($scope, $http, $location) {
  console.log('in DashboardController');

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

  $scope.thank = function(donationObject) {
    console.log('in thank');
    var donation = donationObject;
    //if both are blank, or they are anonymous, alert user
    if (donation.donor_email === 'anonymous') {
      //TODO: mark as thanked anyway
      alert('this was an anonymous email');
    //if the donation email is blank but address is present, generate PDF
    } else if (!donation.donor_email &&  donation.donor_address) {
      alert('donation email is blank, but address is present.');
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
    getAuthStatus();
    getDonations();
  }; // end init

  init();

  //get aggregate dates of all donations
  // $http.get('/private/dashboard/dates')
  //   .then(function(response) {
  //     //condense the dates returned, attach month string, and scope for select
  //     var condensedDates = condenseDateResponse(response.data);
  //     $scope.selectDates = makeDateObjects(condensedDates);
  // }); // end $http

  //condese results of .../dates get
  // var condenseDateResponse = function(responseArray) {
  //   console.log('in condenseDateResponse');
  //   var dates = [];
  //   //push the responses into dates array (if not already in)
  //   for (var i = 0; i < responseArray.length; i++) {
  //     var dateString = responseArray[i].month + ',' + responseArray[i].year;
  //     //if the date is not in dates array, push it in
  //     if (dates.indexOf(dateString) === -1) {
  //       dates.push(dateString);
  //     } // end if
  //   } // end for
  //   return dates;
  // }; // end condenseDateResponse

  //convert month from number to string
  // var convertMonth = function(monthNumber) {
  //   switch (monthNumber) {
  //     case 1:
  //       return 'January';
  //     case 2:
  //       return 'February';
  //     case 3:
  //       return 'March';
  //     case 4:
  //       return 'April';
  //     case 5:
  //       return 'May';
  //     case 6:
  //       return 'June';
  //     case 7:
  //       return 'July';
  //     case 8:
  //       return 'August';
  //     case 8:
  //       return 'September';
  //     case 9:
  //       return 'October';
  //     case 10:
  //       return 'November';
  //     case 12:
  //       return 'December';
  //     default:
  //       return 'Error';
  //   } // end switch
  // }; // end convertMonth

  //convert array of date strings into date-like objects
  // var makeDateObjects = function(array) {
  //   console.log('in makeDateObjects');
  //   var dates = [];
  //   for (var i = 0; i < array.length; i++) {
  //     //split date strings on ','
  //     array[i].split(',');
  //     //marshall variables
  //     var year = array[i].split(',')[1];
  //     var monthNum =  array[i].split(',')[0];
  //     var monthString = convertMonth(Number(monthNum));
  //     //construct object containing date info
  //     var newDate = {
  //       month_num: monthNum,
  //       month_str: monthString,
  //       year: year
  //     }; // end newDate
  //     dates.push(newDate);
  //   } // end for
  //   return dates;
  // }; // end makeDateObjects

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
