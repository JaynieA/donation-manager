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
        var paypalData = formatPaypalObjects(resultsArray);
        console.log('paypal data-->', paypalData);
      } else if (nameString === "Razoo") {
        //if the data is for Razoo, format it that way
        var razooData = formatRazooObjects(resultsArray);
        console.log('razoo data-->', razooData);
      } else if (nameString === "YouCaring") {
        var youCaringData = formatYouCaringObjects(resultsArray);
        console.log('YouCaring data -->', youCaringData);
      } // end else/if
    }; // end formatFileData

    var formatYouCaringObjects = function(resultsArray) {
      console.log('in formatYouCaringObjects', resultsArray);
      //create empty array to push data into
      var youCaringData = [];
      for (var i = 0; i < resultsArray.length; i++) {
        console.log(resultsArray[i][' Amount']);
        //for every row that contains a donation, format a donationObject
        if (resultsArray[i].Amount) {
          var donationObject = {
            platform_name: 'YouCaring',
            date: new Date(resultsArray[i].Date),
            donor_name: resultsArray[i]['Display Name']
          }; // end donationObject
          console.log(donationObject);
        } // end if
      } // end for
    }; // end formatYouCaringObjects

    var formatRazooObjects = function(resultsArray) {
      console.log('in formatRazooObjects');
      //create empty array to push result data into
      var razooData = [];
      for (var i = 0; i < resultsArray.length; i++) {
        //for every row that contains a donation, format a donationObject
        if(resultsArray[i].Amount) {
          //concatenate first and last names to make full name
          var full_name = resultsArray[i]['Donor First Name'] + resultsArray[i]['Donor Last Name'];
          //Format amount- remove the '$ ' at the beginning
          var amount = resultsArray[i].Amount.replace('$', '');
          amount = amount.replace(' ', '');
          //assemble donation object
          var donationObject = {
            platform_name: "Razoo",
            date: new Date(resultsArray[i].Date),
            donor_name: full_name,
            donor_email: resultsArray[i].Email,
            donation_amt: amount,
            reference_id: resultsArray[i]["Tracking #"],
            donor_address: resultsArray[i].Address,
            donor_city: resultsArray[i].City,
            donor_state: resultsArray[i].State,
            donor_zip: resultsArray[i].Zip,
            origin: resultsArray[i].Origin
          }; // end donationObject
          //push the donationObject into razooData array
          razooData.push(donationObject);
        } // end if
      } // end for
      return razooData;
    }; // end formatRazooObjects

    var formatPaypalObjects = function(resultsArray) {
      console.log('in formatPaypalObjects');
      //create empty array to push result data to
      var paypalData = [];
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
            reference_id: resultsArray[i]["Transaction ID"],
            address: resultsArray[i]["Shipping Address"],
            origin: resultsArray[i]['Item ID']
          }; // end donationObject
          //push the DonationObject into paypalData array
          paypalData.push(donationObject);
        } // end if
      } // end for loop
      return paypalData;
    }; // end formatPaypalObjects


  } // end controller callback
]); // end ModalInstanceController
