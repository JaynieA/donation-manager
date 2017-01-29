//Donation Factory
myApp.factory('DonationFactory', function($http) {
  if (verbose) console.log('in Donation factory');
  var factory = {};

  factory.getAllDonations = function() {
    if (verbose) console.log('in getDonations');
    return $http.get('/private/donations');
  }; // end getDonations

  factory.getMonthlyDonations = function(monthNum) {
    if (verbose) console.log('in getMonthlyDonations');
    return $http.get('/private/donations/monthly/' + monthNum);
  }; // end getMonthlyDonations

  factory.getCurrentYearsDonations = function(yearNum) {
    if (verbose) console.log('in getCurrentYearsDonations');
    return $http.get('/private/donations/year');
  }; // end getCurrentYearsDonations

  factory.saveUploadedDonations = function(completeUploadResults) {
    if (verbose) console.log('in saveUploadedDonations');
    return $http.post('/private/donations', { donations: completeUploadResults }); // end $http
  }; // end saveUploadedDonations

  factory.getAggregateDonationDates = function() {
    if (verbose) console.log('in getAggregateDonationDates');
    return $http.get('/private/donations/dates');
  }; // end getAggregateDonationDates

  factory.updateThankedStatus = function(id) {
    if (verbose) console.log('in updateThankedStatus');
    return $http.put('/private/donations', {id: id}); // end $http
  }; // end updateThankedStatus

  return factory;
}); // end donorFactory
