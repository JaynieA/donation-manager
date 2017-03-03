//Dashboard Controller
myApp.controller('DashboardController', ['AuthFactory', 'DonationFactory', '$scope', '$http','$location', '$timeout',
 function(AuthFactory, DonationFactory, $scope, $http, $location, $timeout) {
  if (verbose) console.log('in DashboardController');

  //declare donationFactory
  var donationFactory = DonationFactory;
  //declare authFactory
  var authFactory = AuthFactory;
  var authorized = authFactory.checkLoggedIn();
  if (verbose) console.log('AUTH in DC-->',authorized);

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
      /* Wait two seconds for pdf to generate, then use the printJS library
         to serve newly created file in print window */
      $timeout(function() {
        printJS({ printable: '/private/docs/NewDoc', type:'pdf'});
        //update the thanked status of the donation
        updateThankedStatus(donationObject._id);
      }, 2000);
    }); // end $http
  }; // end generatePDF

  var getAggregateDonationDates = function() {
    if (verbose) console.log('in getAggregateDonationDates');
    //get aggregate years/months of all donations (from donationFactory)
    donationFactory.getAggregateDonationDates()
    .then(function(response) {
      if (verbose) console.log('getAggregateDonationDates response-->', response.data);
      //set fiter select values
      var monthsArray = getMonths(response.data);
      $scope.allMonths = makeMonthsObject(monthsArray);
      var yearsArray = getYears(response.data);
      $scope.allYears = makeYearObjects(yearsArray);
    }).catch(function(err) {
      if (verbose) console.log(error);
    }); // end $http promise
  }; // end getAggregateDonationDates

  var getDonations = function() {
    if (verbose) console.log('in getDonations');
    //get all donations through donation factory
    donationFactory.getAllDonations()
    .then(function(response){
      if (verbose) console.log('getDonations respose-->',response.data);
      $scope.donations = response.data.donations;
      $scope.isThanking = true;
    }).catch(function(err) {
      if (verbose) console.log(err);
    }); // end DF getDonations
  }; // end getDonations

  var getMonths = function(dateObject) {
    //return an array of months from dateObject
    var months = [];
    for (var i = 0; i < dateObject.length; i++) {
      //if month is not already in months array, push it in
      if (months.indexOf(dateObject[i].month) === -1) {
        months.push(dateObject[i].month);
      } // end if
    } // end for
    //sort the number in the array in ascending order
    months = months.sort(function(a, b){return a-b;});
    return months;
  }; // end getMonths

  var getYears = function(dateObject) {
    //return an array of years from dateObject
    var years = [];
    for (var i = 0; i < dateObject.length; i++) {
      //if year is not already in years array, push it in
      if (years.indexOf(dateObject[i].year) === -1) {
        years.push(dateObject[i].year);
      } // end if
    } // end for
    //sort the numbers in the array in desending order
    years = years.sort(function(a, b){return b-a;});
    return years;
  }; // end getYears

  var init = function() {
    if (verbose) console.log('in init');
    //get donations to populate table
    getDonations();
    //get donation dates for select filter
    getAggregateDonationDates();
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
    //Initiate thanked filter to 'Not Thanked'
    $scope.thankSelected = { value: {value: false, display: 'Not Thanked'} };
  }; // end init

  var makeMonthsObject = function(monthsArray) {
    if (verbose) console.log('in makeMonthsObject');
    //declare empty array to store all month objects
    var allMonthObjects = [];
    //loop through monthsArray and create month objects
    for (var i = 0; i < monthsArray.length; i++) {
      var monthObject = {
        month_num: Number(monthsArray[i]) - 1,
        month_str: convertToMonthName(monthsArray[i])
      }; // end monthObject
      //push the monthObject into allMonthObjects array
      allMonthObjects.push(monthObject);
    } // end for
    return allMonthObjects;
  }; // end makeMonthsObject

  var makeYearObjects = function(yearsArray) {
    if (verbose) console.log('in makeYearsObjects');
    var allYears = [];
    //loop through yearsArray and create month objects
    for (var i = 0; i < yearsArray.length; i++) {
      var newYear = {
        year: yearsArray[i]
      }; // end newYear
      //push year object into allYears array
      allYears.push(newYear);
    } // end for
    return allYears;
  }; // end makeYearsObjects

  var sendEmail = function(donation) {
    if (verbose) console.log('in sendEmail', donation);
    //construct object to send
    var objectToSend = {
      donor_name: donation.donor_name,
      donor_email: donation.donor_email,
      donation_amt: donation.donation_amt
    }; // end objectToSend
    //post info to the server
    $http({
      method: 'POST',
      url: '/private/email',
      data: objectToSend
    }).then(function(response) {
      if (verbose) console.log('send email response-->',response.data);
      //update thanked status for this donation
      updateThankedStatus(donation._id);
    }).catch(function(err) {
      //if there was an error, log it
      if (verbose) console.log(err);
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
      //TODO: add error handling here if none of the above conditions are met;
      if (verbose) alert('error');
    } // end else
  }; // end thank

  var updateThankedStatus = function(id) {
    if (verbose) console.log('in updateThankedStatus', id);
    //use donationFactory function to update the thanked status
    donationFactory.updateThankedStatus(id)
    .then(function(response) {
      if (verbose) console.log(response.data);
      //update donations displayed on DOM
      getDonations();
    }).catch(function(err) {
      //if there was an error, log it
      if (verbose) console.log(err);
    }); // end $http promise
  }; // end updateThankedStatus

  //make sure user it authorized
  //if they are, show them the view and run init function
  confirmAuth();

}]); // end DashboardController
