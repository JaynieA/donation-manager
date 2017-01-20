//ModalCtrl
myApp.controller('ModalCtrl', ['$scope','$uibModal',function ($scope, $uibModal) {
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
//which is the instance of modal returned by the open() function.
//We need to pass this instance because dismiss is the property of
//this instance object which is used to close the modal.

//ModalInstanceController
myApp.controller('ModalInstanceController', ['$scope','$uibModalInstance', 'Upload', '$timeout', '$http',
  function ($scope, $uibModalInstance, Upload, $timeout, $http) {
    console.log('in ModalInstanceController');

    //Define platforms for repeat
    $scope.platforms = [
      { name: 'Paypal', fileData: undefined, progress: 0 },
      { name: 'Razoo', fileData: undefined, progress: 0 },
      { name: 'YouCaring', fileData: undefined, progress: 0 }
    ];

    //close the  modal
    $scope.close = function () {
      $uibModalInstance.dismiss('cancel');
    }; // end close

    //save info received from uploads
    $scope.save = function () {
      console.log('save modal results-->', $scope.platforms);


      //construct object to send
      var objectToSend = {
        paypal: $scope.platforms[0].fileData,
        razoo: $scope.platforms[1].fileData,
        youCaring: $scope.platforms[2].fileData
      };
      console.log(objectToSend);
      // //send object to the server
      // $http({
      //   method: 'POST',
      //   url: '/home',
      //   data: {stuff: $scope.platforms}
      // }).then(function(response) {
      //   console.log(response);
      // }); // end then
      //close the modal
      $uibModalInstance.close();
    }; // end save

    $scope.uploadFile = function(file, errFiles, index) {
        console.log('index being uploaded -->',index);
        $scope.f = file;
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
                $scope.platforms[index].progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }); // end progress function
        } // end if
        // Parse the uploaded file's data using papa parse
        Papa.parse(file, {
          header: true,
          //when parsing is complete:
        	complete: function(results) {
            //log the parsed results
        		//console.log("Parsed Result:", results);

          //TODO: parse through platform data and keep only the necessary information:
          var uploadedPlatformName = $scope.platforms[index].name;
          var resultsArray = results.data;
          formatFileData(uploadedPlatformName, resultsArray);

          //populate the fileData property value for the appropriate platform
          // $scope.platforms[index].fileData = results.data;
          // console.log('complete platform data-->', $scope.platforms);

        	} // end complete
        }); // end Papa.parse
    }; // end uploadFile

    var formatFileData = function(nameString, resultsArray) {
      console.log('in formatFileData--> for', nameString);

      if (nameString === 'Paypal') {
        //if the data is for Paypal, format it that way
        paypalData = formatPaypalObjects(resultsArray);
      } else if (nameString === "Razoo") {
        //if the data is for Razoo, format it that way
        //TODO: make formatRazooObjects function
      } else if (nameString === "YouCaring") {
        //if the data is for YouCaring, format it that way
        //TODO: make formatYouCaringObjects function
      } // end else/if
    }; // end formatFileData

    var formatPaypalObjects = function(resultsArray) {
      console.log('in formatPaypalObjects');
      //create empty object to push result data to
      var paypalData = {};
      for (var i = 0; i < resultsArray.length; i++) {
        //if the object is a donation payment, process it
        if (resultsArray[i].Type === "Donation Payment") {
          //assemble donation object
          var donationObject = {
            platform_name: 'Paypal',
            date: new Date(resultsArray[i].Date),
            donor_name: resultsArray[i].Name,
            donor_email: resultsArray[i]["From Email Address"],
            donation_amt: resultsArray[i].Gross,
            transaction_id: resultsArray[i]["Transaction ID"]
          }; // end donationObject
          console.log('paypal donation object-->',donationObject);
        } // end if
      } // end for loop
    }; // end formatPaypalObjects

  } // end controller callback
]); // end ModalInstanceController
