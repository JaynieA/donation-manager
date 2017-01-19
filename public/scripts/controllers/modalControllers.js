//Modal controllers
myApp.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.platforms = ['Paypal', 'Razoo', 'WePay'];

  //allow fade/slide-in
  $ctrl.animationsEnabled = true;

  //open the modal
  $ctrl.open = function (size, parentSelector) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        platforms: function () {
          return $ctrl.platforms;
        }
      }
    });

    modalInstance.result.then(function (selectedPlatform) {
      $ctrl.selected = selectedPlatform;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  //enable animations
  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});

// $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, platforms) {
  var $ctrl = this;
  $ctrl.platforms = platforms;
  $ctrl.selected = {
    platform: $ctrl.platforms[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.platform);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

myApp.component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.platforms = $ctrl.resolve.platforms;
      $ctrl.selected = {
        platform: $ctrl.platforms[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.platform});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
