//Declare app
var myApp = angular.module('myApp', ['ngRoute']);

//Config
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '../views/routes/home.html',
      controller: 'HomeController'
    })
    .when('/dashboard', {
      templateUrl: '../views/routes/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/templates', {
      templateUrl: '../views/routes/templates.html',
      controller: 'TemplatesController'
    })
    .otherwise({
      redirectTo: 'home'
    }); // end $routeProvider
}]); // end config

//Factory
myApp.factory('donorFactory', function() {
  var factory = {};
  factory.testNumber = 1;
  return factory;
}); // end donorFactory
