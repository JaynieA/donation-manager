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

  var fileData = {
    paypal: undefined,
    razoo: undefined,
    youcaring: undefined
  }; // end fileObjects

  //set platforms for repeat
  $scope.platforms = ['Paypal', 'Razoo', 'YouCaring'];

  $scope.uploadFile = function(file, errFiles, platform) {
      console.log('platform-->',platform);
      
      var f = platform + 'File';
      console.log('f-->', f);

      $scope[f] = file;


      $scope.errFile = errFiles && errFiles[0];
      //if a file was uploaded, continue
      if (file) {
          //upload the file
          file.upload = Upload.upload({
              url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
              data: {file: file}
          }); // end upload
          //return data if there are timeouts/errors
          file.upload.then(function (response) {
              $timeout(function () {
                  file.result = response.data;
              }); // end $timeout
          }, function (response) {
              if (response.status > 0)
                  $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
              //track upload progress
              file.progress = Math.min(100, parseInt(100.0 *
                                       evt.loaded / evt.total));
                                       console.log(file.progress);
          }); // end progress function
      } // end if
      // Parse the uploaded file's data using papa parse
      Papa.parse(file, {
        header: true,
        //when parsing is complete:
      	complete: function(results) {
          //log the parsed results
      		console.log("Parsed Result:", results);
          //update the fileData object (depending on the platform)
          if (platform === 'Paypal') {
            fileData.paypal = results.data;
          } else if (platform === "Razoo") {
            fileData.razoo = results.data;
          }  else if (platform === 'YouCaring') {
            fileData.youcaring = results.data;
          } // end else/if
          console.log('file data object-->', fileData);
      	} // end complete
      }); // end Papa.parse



  }; // end uploadFile

  //close the  modal
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  }; // end close

  //save info received from uploads
  $scope.save = function () {
    console.log('save modal results');
    $uibModalInstance.close();
  }; // end close
}]); // end ModalInstanceController
