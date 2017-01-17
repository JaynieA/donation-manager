//Factory
myApp.factory('donorFactory', function() {
  console.log('in donor factory');
  var factory = {};
  factory.testNumber = 1;
  return factory;
}); // end donorFactory
