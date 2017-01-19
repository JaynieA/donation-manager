//ModalCtrl
myApp.controller('ModalCtrl', ['$scope','$uibModal',function ($scope, $uibModal) {
  console.log('in modalCtrl');

  //open the modal
  //the open method returns a modal instance
  $scope.open = function (size) {
    console.log('opening pop up');
    var modalInstance = $uibModal.open({
      templateUrl: 'uploadReportsModal.html',
      controller: 'ModalInstanceController',
      size: size,
    }); // end modalInstance
  }; // end open

}]); // end ModalCtrl

//In ModalInstanceController, we have passed $modalInstance
//which is the instance of modal return by the open() function.
//We need to pass this instance because dismiss is the property of
//this instance object which is used to close the modal.

//ModalInstanceController
myApp.controller('ModalInstanceController', ['$scope','$uibModalInstance',function ($scope, $uibModalInstance) {
  console.log('in ModalInstanceController');
  //set platforms for repeat
  $scope.platforms = ['Paypal', 'Razoo', 'YouCaring'];

  $scope.uploadFile = function(val) {
    console.log(val);
  }; // end uploadFile


  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  }; // end close

  $scope.save = function () {
    console.log('save modal results');
    $uibModalInstance.close();
  }; // end close
}]); // end ModalInstanceController
