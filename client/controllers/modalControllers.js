//ModalCtrl
myApp.controller('ModalCtrl', ['$scope','$uibModal', '$timeout',function ($scope, $uibModal, $timeout) {

  //get the the time that the countdown is counting down to
  var getEndTime = function() {
    const MAX_DAY = 3; //3rd day of the month
    const NOW = moment()._d; //today's date
    const CURRENT_DAY = moment().get('date'); //current day (number)
    const CURRENT_MONTH = moment().get('month');
    const CURRENT_YEAR = moment().get('year'); // current year
    var endTime;
    //If the current date (1-31) < 3
    if (CURRENT_DAY < MAX_DAY) {
      //set endTime to the 3rd of the current month
      endTime = moment(new Date(CURRENT_YEAR, CURRENT_MONTH, MAX_DAY))._d;
    //if current date >= 3
    } else {
      const NEXT_MONTH = CURRENT_MONTH + 1;
      //set endTime to the third day of the next month
      endTime = moment(new Date(CURRENT_YEAR, NEXT_MONTH, MAX_DAY))._d;
    } // end else
    return endTime;
  }; // end getEndTime

  //get time remaining between current date and endtime
  var getTimeRemaining = function(endtime){
    //var t holds remaining time before endtime
    var t = Date.parse(endtime) - Date.parse(new Date());
    //convert time strings into values in milliseconds
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    //Output the Clock Data as an object
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }; // end object
  }; // end getTimeRemaining

  //open the modal (returns a modal instance)
  $scope.open = function (size) {
    //open the modal
    if (verbose) console.log('opening pop up');
    //set the modalInstance
    var modalInstance = $uibModal.open({
      templateUrl: 'uploadReportsModal.html',
      controller: 'ModalInstanceController',
      size: size,
    }); // end modalInstance
  }; // end open

  //initialize the countdown
  var updateClock = function() {
    //Calculate the remaining time
    var t = getTimeRemaining(getEndTime());
    //Output the remaining time to the DOM
    $scope.days = t.days;
    $scope.hours = t.hours;
    $scope.minutes = t.minutes;
    //add a leading zero to the “seconds” value
    //adds a string of ‘0′ to the beginning of the number and then slices off the last two digits
    $scope.seconds = ('0' + t.seconds).slice(-2);
    //continue to execute the function every second
    $timeout(function() {
      updateClock();
    }, 1000); // end $timeout
  }; // end updateClock

  //initialize the view
  var init = function() {
    if (verbose) console.log('in init modalCtrl');
    updateClock(); //run function once at first to avoid delay on load
  }; // end init

  init();

}]); // end ModalCtrl

//ModalInstanceController is passed $modalInstance
//which is the instance of modal returned by the open() function.
//This instance needs to be passed because dismiss is the property of
//this instance object which is used to close the modal.

//ModalInstanceController
myApp.controller('ModalInstanceController', ['DonationFactory','$scope','$uibModalInstance',
                                             'Upload', '$timeout', '$location',
  function (DonationFactory, $scope, $uibModalInstance, Upload, $timeout, $location) {
    if (verbose) console.log('in ModalInstanceController');

    //define donationFactory variable
    var donationFactory = DonationFactory;
    //define array for storage
    var completeUploadResults = [];
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

    var formatFileData = function(nameString, resultsArray) {
      if (verbose) console.log('in formatFileData--> for', nameString);
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
      if (verbose) console.log('in formatYouCaringObjects');
      //create empty array to push data into
      var youCaringData = [];
      for (var i = 0; i < resultsArray.length; i++) {
        //for every row that contains a donation, format a donationObject
        if (resultsArray[i][' Amount']) {
          //format the variables
          var email = setUndefinedIfBlank(resultsArray[i][' Email'].trim());
          var name = resultsArray[i][' Display Name'].trim();
          var amount = resultsArray[i][' Amount'].trim();
          //format address variables
          var address = setUndefinedIfBlank(resultsArray[i][' Address 1'].trim());
          var city = setUndefinedIfBlank(resultsArray[i][' City'].trim());
          var state = setUndefinedIfBlank(resultsArray[i][' State'].trim());
          var zip = Number(resultsArray[i][' Zip'].trim());
            if (zip === 0) {
              zip = undefined;
            } // end if
          //format date variables
          var wholeDateIn = resultsArray[i][' Date'];
          var date = moment( new Date( wholeDateIn ) )._d;
          var month = moment( new Date( wholeDateIn ) ).month();
          var year = moment( new Date( wholeDateIn ) ).year();
          //assemble donationObject
          var donationObject = {
            platform_name: 'YouCaring',
            date: date,
            donor_name: name,
            donor_email: email,
            donation_amt: Number(amount),
            donor_address: address,
            donor_city: city,
            donor_state: state,
            donor_zip: zip,
            reference_id: undefined,
            origin: resultsArray[i].Title,
            donation_month: month,
            donation_year: year
          }; // end donationObject
          //push objects into youCaringData array
          youCaringData.push(donationObject);
        } // end if
      } // end for
      return youCaringData;
    }; // end formatYouCaringObjects

    var formatRazooObjects = function(resultsArray) {
      if (verbose) console.log('in formatRazooObjects');
      //create empty array to push result data into
      var razooData = [];
      for (var i = 0; i < resultsArray.length; i++) {
        //for every row that contains a donation, format a donationObject
        if(resultsArray[i].Amount) {
          //concatenate first and last names to make full name
          var full_name = resultsArray[i]['Donor First Name'] + ' ' + resultsArray[i]['Donor Last Name'];
          //Format amount- remove the '$ ' at the beginning
          var amount = resultsArray[i].Amount.replace('$', '');
          amount = amount.trim();
          //format date variables
          var wholeDateIn = resultsArray[i].Date;
          var date = moment( new Date( wholeDateIn ) )._d;
          var month = moment( new Date( wholeDateIn ) ).month();
          var year = moment( new Date( wholeDateIn ) ).year();
          //assemble donation object
          var donationObject = {
            platform_name: "Razoo",
            date: date,
            donor_name: full_name,
            donor_email: resultsArray[i].Email,
            donation_amt: Number(amount),
            reference_id: resultsArray[i]["Tracking #"],
            donor_address: resultsArray[i].Address,
            donor_city: resultsArray[i].City,
            donor_state: resultsArray[i].State,
            donor_zip: Number(resultsArray[i].Zip),
            origin: resultsArray[i].Origin,
            donation_month: month,
            donation_year: year
          }; // end donationObject
          //push the donationObject into razooData array
          razooData.push(donationObject);
        } // end if
      } // end for
      return razooData;
    }; // end formatRazooObjects

    var formatPaypalObjects = function(resultsArray) {
      if (verbose) console.log('in formatPaypalObjects');
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
            zip = addressArray[1].trim();
            state = addressArray[2].trim();
            city = addressArray[3].trim().toLowerCase();
            //convert city to lowercase, capitilize first letter
            city = city.charAt(0).toUpperCase() + city.slice(1);
            address = addressArray[4].trim();
          } else {
            //else, the address does not exist
            //address variables should all be set to undefined
            zip = undefined;
            state = undefined;
            city = undefined;
            address = undefined;
          } // end else
          //format date variables
          var wholeDateIn = resultsArray[i].Date;
          var date = moment( new Date( wholeDateIn ) )._d;
          var month = moment( new Date( wholeDateIn ) ).month();
          var year = moment( new Date( wholeDateIn ) ).year();
          //assemble donation object
          var donationObject = {
            platform_name: 'Paypal',
            date: date,
            donor_name: resultsArray[i].Name,
            donor_email: resultsArray[i]["From Email Address"],
            donation_amt: Number(resultsArray[i].Gross),
            reference_id: resultsArray[i]["Transaction ID"],
            donor_address: address,
            donor_city: city,
            donor_state: state,
            donor_zip: Number(zip),
            origin: resultsArray[i]['Item ID'],
            donation_month: month,
            donation_year: year
          }; // end donationObject
          //push the DonationObject into paypalData array
          paypalData.push(donationObject);
        } // end if
      } // end for loop
      return paypalData;
    }; // end formatPaypalObjects

    //save info received from uploads
    $scope.save = function() {
      if (verbose) console.log('in save-->', completeUploadResults);
      donationFactory.saveUploadedDonations(completeUploadResults)
      .then(function(response) {
        if (verbose) console.log('SAVE RESPONSE-->', response.data);
        //close the modal
        $uibModalInstance.close();
        //Reroute the user to dahsboard view
        $location.path( "/dashboard" );
      }).catch(function(err) {
        if (verbose) console.log(err);
      }); // end promise
    }; // end save

    var setUndefinedIfBlank = function(string) {
      //set value as undefined if it is a blank string
      if (string === '') {
        return undefined;
      } else {
        return string;
      } // end else
    }; // end setUndefinedIfBlank

    //handle CSV uploads
    $scope.uploadFile = function(file, errFiles, index) {
        if (verbose) console.log('in uploadFile. uploading-->', index);
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

  } // end controller callback
]); // end ModalInstanceController
