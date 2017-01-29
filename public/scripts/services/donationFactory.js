//Factory
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

  return factory;
}); // end donorFactory


// ****** USE IN DASHBORD CONTROLLER WHEN REFACTOR FROM SERVICE ***** //
//get all donations through donation factory
// donationFactory.getAllDonations()
// .then(function(response){
//   $scope.something = response.data;
//   if (verbose) console.log('FACTORY RESPONSE-->',response.data);
// }).catch(function(err) {
//   if (verbose) console.log(err);
// }); // end DF getDonations
