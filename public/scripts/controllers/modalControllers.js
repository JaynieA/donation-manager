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
myApp.controller('ModalInstanceController', ['$scope','$uibModalInstance', 'Upload', '$timeout',function ($scope, $uibModalInstance, Upload, $timeout) {
  console.log('in ModalInstanceController');
  //set platforms for repeat
  $scope.platforms = ['Paypal', 'Razoo', 'YouCaring'];

  // $scope.uploadFile = function(val) {
  //   console.log('upload file input clicked-->',val);
  // }; // end uploadFile

  $scope.uploadFile = function(file, errFiles, platform) {
        $scope.f = file;
        console.log('platform-->',platform);

        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
                                         console.log(file.progress);
            });
        }

        console.log('file-->',file);

        // Parse local CSV file using papa parse
        Papa.parse(file, {
          header: true,
        	complete: function(results) {
            //log the parsed results
        		console.log("Parsed Result:", results);
        	}
        });
    };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  }; // end close

  $scope.save = function () {
    console.log('save modal results');
    $uibModalInstance.close();
  }; // end close
}]); // end ModalInstanceController
