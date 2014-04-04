angular.module('LoginCtrl', []).controller(
  'LoginController', ['$scope', 'Login', '$location', function($scope, Login, $location) {

  $scope.login = function() {
    if (Login.authenticate($scope.email, $scope.password)) {
      $location.path("/petshop");
    }
  }

}]);