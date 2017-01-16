//Home Controller
myApp.controller('HomeController', ['$scope', '$http', 'donorFactory', function($scope, $http, donorFactory) {
  console.log('home controller');
  console.log('from factory -->', donorFactory.testNumber);
}]); // end HomeController
