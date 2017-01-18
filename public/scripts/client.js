//Declare app
var myApp = angular.module('myApp', ['ngAnimate', 'ngSanitize','ngRoute', 'ui.bootstrap', ]);

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
    .when('/error', {
      templateUrl: '../views/routes/error.html',
      controller: 'ErrorController',
      controllerAs: 'error'
    })
    .otherwise({
      redirectTo: 'login'
    }); // end $routeProvider
}]); // end config

//Modal controllers
myApp.controller('ModalDemoCtrl', ['$uibModal', '$log', '$document', function($uibModal, $log, $document) {
  console.log('in ModalDemoCtrl');
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };

}]); // end ModalDemoCtrl

myApp.controller('ModalInstanceCtrl', ['$uibModalInstance', 'items', function($uibModalInstance, items) {
  console.log('in ModalInstanceCtrl');
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]); // end ModalInstanceCtrl

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('myApp').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
