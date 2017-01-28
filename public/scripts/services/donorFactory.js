//Factory
myApp.factory('donorFactory', function() {
  if (verbose) console.log('in donor factory');
  var factory = {};
  factory.testNumber = 1;
  return factory;
}); // end donorFactory
