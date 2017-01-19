//papaparser directive
myApp.directive('fileReader', function() {
  console.log('in fileReader');
  return {
    scope: {
      fileReader:"="
    },
    link: function($scope, element) {

      element.bind('change', function(changeEvent) {

        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              //grab contents of the uploaded csv
              var contents = e.target.result;
              $scope.$apply(function () {
                //console.log(contents);
                //use papaparse to parse the csv
                var results = Papa.parse(contents, {
                	header: true
                });
                //log the parsed results
                
                //TODO: send these results to a factory? Get them in to the modalController somehow...

                console.log('results-->', results);

                $scope.fileReader = 'success!';

              }); // end $apply
          }; // end onload
          r.readAsText(files[0]);
        } // end if
      }); // end bind

    } // end link
  }; // end return
}); // end fileReader directive
