//Declare app
var myApp = angular.module('myApp', ['ngAnimate','ngRoute','ui.select','ngSanitize', 'ui.bootstrap', 'ngFileUpload', 'rzModule']);

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
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/dashboard', {
      templateUrl: '../views/routes/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard'
    })
    .when('/templates', {
      templateUrl: '../views/routes/templates.html',
      controller: 'TemplatesController',
      controllerAs: 'templates'
    })
    .when('/users', {
      templateUrl: '../views/routes/users.html',
      controller: 'UsersController',
      controllerAs: 'users'
    })
    .when('/error', {
      templateUrl: '../views/routes/error.html',
      controller: 'ErrorController',
      controllerAs: 'error'
    })
    .otherwise({
      redirectTo: 'login'
    }); // end $routeProvider
}]); // end config
