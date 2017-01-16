console.log('js');

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


//Home Controller
myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  console.log('home controller');
}]); // end HomeController

//Dashboard Controller
myApp.controller('DashboardController', ['$scope', '$http', function($scope, $http) {
  console.log('dashboard controller');
}]); // end DashboardController

//Templates Controller
myApp.controller('TemplatesController', ['$scope', '$http', function($scope, $http) {
  console.log('NG');
}]); // end TemplatesController
