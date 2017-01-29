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

  return factory;
}); // end donorFactory
