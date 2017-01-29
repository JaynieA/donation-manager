//Factory
myApp.factory('DonationFactory', function($http) {
  if (verbose) console.log('in Donation factory');
  var factory = {};

  factory.getAllDonations = function() {
    console.log('in getDonations');
    return $http.get('/private/donations');
  }; // end getDonations

  factory.getMonthlyDonations = function(monthNum) {
    console.log('in getMonthlyDonations');
    return $http.get('/private/donations/monthly/' + monthNum);
  }; // end getMonthlyDonations

  factory.getCurrentYearsDonations = function(yearNum) {
    console.log('in getCurrentYearsDonations');
    return $http.get('/private/donations/year');
  }; // end getCurrentYearsDonations

  return factory;
}); // end donorFactory


// ****** REFACTOR FROM SERVICE ***** //
//get all donations through donation factory
// donationFactory.getAllDonations()
// .then(function(response){
//   $scope.something = response.data;
//   if (verbose) console.log('FACTORY RESPONSE-->',response.data);
// }).catch(function(err) {
//   if (verbose) console.log(err);
// }); // end DF getDonations
