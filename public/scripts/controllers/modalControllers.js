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
myApp.controller('ModalInstanceController', ['$scope','$uibModalInstance', 'Upload', '$timeout', '$http', '$location',
  function ($scope, $uibModalInstance, Upload, $timeout, $http, $location) {
    console.log('in ModalInstanceController');

    //Define platforms for repeat
    $scope.platforms = [
      { name: 'Paypal', fileData: undefined, progress: 0 },
      { name: 'Razoo', fileData: undefined, progress: 0 },
      { name: 'YouCaring', fileData: undefined, progress: 0 }
    ];
    //define array for storage
    var completeUploadResults = [];

    //close the  modal
    $scope.close = function () {
      $uibModalInstance.dismiss('cancel');
    }; // end close

    //save info received from uploads
    $scope.save = function () {
      console.log('in save-->', completeUploadResults);
      //send completeUploadResults to the server
      $http({
        method: 'POST',
        url: '/private/home',
        data: { donations: completeUploadResults }
      }).then(function(response) {
        console.log(response);
        //close the modal
        $uibModalInstance.close();
        //TODO: reroute the user to dahsboard view
        //currently--> this redirects to dashboard and then gets redirected to login??
        //$location.path( "/#!/dashboard" );
      }); // end then
    }; // end save

    //handle CSV uploads
    $scope.uploadFile = function(file, errFiles, index) {
        console.log('in uploadFile. uploading-->', index);
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
            //parse through platform data, format and and keep only the necessary information
            var uploadedPlatformName = $scope.platforms[index].name;
            var resultsArray = results.data;
            var formattedResultsArray = formatFileData(uploadedPlatformName, resultsArray);
            //add the results to the completeUploadResults array
            completeUploadResults = completeUploadResults.concat( formattedResultsArray );
        	} // end complete
        }); // end Papa.parse
    }; // end uploadFile

    var formatFileData = function(nameString, resultsArray) {
      console.log('in formatFileData--> for', nameString);
      var formattedResultsArray;
      if (nameString === 'Paypal') {
        //if the data is for Paypal, format it that way
        formattedResultsArray = formatPaypalObjects(resultsArray);
      } else if (nameString === "Razoo") {
        //if the data is for Razoo, format it that way
        formattedResultsArray = formatRazooObjects(resultsArray);
      } else if (nameString === "YouCaring") {
        formattedResultsArray = formatYouCaringObjects(resultsArray);
      } // end else/if
      //return an array of formatted results
      return formattedResultsArray;
    }; // end formatFileData

    var formatYouCaringObjects = function(resultsArray) {
      console.log('in formatYouCaringObjects');
      //create empty array to push data into
      var youCaringData = [];
      for (var i = 0; i < resultsArray.length; i++) {
        //for every row that contains a donation, format a donationObject
        if (resultsArray[i][' Amount']) {
          //format the variables
          var email = resultsArray[i][' Email'].replace(' ', '');
          var name = resultsArray[i][' Display Name'].replace(' ', '');
          var amount = resultsArray[i][' Amount'].replace(' ', '');
          //format address variables
          var address = resultsArray[i][' Address 1'].replace(' ', '');
            if (address === '') {
              address = undefined;
            } // end if
          var city = resultsArray[i][' City'].replace(' ', '');
            if (city === '') {
              city = undefined;
            } // end if
          var state = resultsArray[i][' State'].replace(' ', '');
            if (state === '') {
              state = undefined;
            } // end if
          var zip = resultsArray[i][' Zip'].replace(' ', '');
            if (zip === '') {
              zip = undefined;
            } // end if
          //assemble donationObject
          var donationObject = {
            platform_name: 'YouCaring',
            date: new Date(resultsArray[i][' Date']),
            donor_name: name,
            donor_email: email,
            donation_amt: Number(amount),
            donor_address: address,
            donor_city: city,
            donor_state: state,
            donor_zip: Number(zip),
            reference_id: undefined,
            origin: resultsArray[i].Title,
            donation_month: new Date(resultsArray[i][' Date']).getMonth(),
            donation_year: new Date(resultsArray[i][' Date']).getFullYear()
          }; // end donationObject
          //push objects into youCaringData array
          youCaringData.push(donationObject);
        } // end if
      } // end for
      return youCaringData;
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
            donation_amt: Number(amount),
            reference_id: resultsArray[i]["Tracking #"],
            donor_address: resultsArray[i].Address,
            donor_city: resultsArray[i].City,
            donor_state: resultsArray[i].State,
            donor_zip: Number(resultsArray[i].Zip),
            origin: resultsArray[i].Origin,
            donation_month: new Date(resultsArray[i].Date).getMonth(),
            donation_year: new Date(resultsArray[i].Date).getFullYear()
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
        var zip, state, city, address;
        //if the object is a donation payment, process it
        if (resultsArray[i].Type === "Donation Payment") {
          //split the address string into array on ',', then reverse the array
          var addressArray = resultsArray[i]["Shipping Address"].split(',').reverse();
          // if the first item in the array is "US", the address exists
          if (addressArray[0] === ' US') {
            //define and format address variables
            zip = addressArray[1].replace(' ', '');
            state = addressArray[2].replace(' ', '');
            city = addressArray[3].replace(' ', '').toLowerCase();
            //convert city to lowercase, capitilize first letter
            city = city.charAt(0).toUpperCase() + city.slice(1);
            address = addressArray[4].replace(' ', '');
          } else {
            //else, the address does not exist
            //address variables should all be set to undefined
            zip = undefined;
            state = undefined;
            city = undefined;
            address = undefined;
          } // end else
          //assemble donation object
          var donationObject = {
            platform_name: 'Paypal',
            date: new Date(resultsArray[i].Date),
            donor_name: resultsArray[i].Name,
            donor_email: resultsArray[i]["From Email Address"],
            donation_amt: Number(resultsArray[i].Gross),
            reference_id: resultsArray[i]["Transaction ID"],
            donor_address: address,
            donor_city: city,
            donor_state: state,
            donor_zip: Number(zip),
            origin: resultsArray[i]['Item ID'],
            donation_month: new Date(resultsArray[i].Date).getMonth(),
            donation_year: new Date(resultsArray[i].Date).getFullYear()
          }; // end donationObject
          //push the DonationObject into paypalData array
          paypalData.push(donationObject);
        } // end if
      } // end for loop
      return paypalData;
    }; // end formatPaypalObjects


  } // end controller callback
]); // end ModalInstanceController
