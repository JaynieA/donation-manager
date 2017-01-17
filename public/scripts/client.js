//Declare app
var myApp = angular.module('myApp', ['ngRoute']);

//Config
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '../views/routes/login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
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
      redirectTo: 'login'
    }); // end $routeProvider
}]); // end config
