//Modal controllers
myApp.controller('ModalDemoCtrl', ['$uibModal', '$log', '$document', function($uibModal, $log, $document) {
  console.log('in ModalDemoCtrl');
  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  //handle modal open
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
        } // end items
      } // end resolve
    }); // end modalInstance
    //handles modal cancel - logs the time of cancellation
    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    }); // end then
  }; // end open

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  }; // end toggleAnimation

}]); // end ModalDemoCtrl

myApp.controller('ModalInstanceCtrl', ['$uibModalInstance', 'items', function($uibModalInstance, items) {
  console.log('in ModalInstanceCtrl');
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  }; // end ok

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }; // end cancel
}]); // end ModalInstanceCtrl

// The close and dismiss bindings are from $uibModalInstance.
angular.module('myApp').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }, // end bindings
  controller: function () {
    var $ctrl = this;

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    }; // end ok

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    }; // end cancel
  } // end controller
}); // end modalComponent
