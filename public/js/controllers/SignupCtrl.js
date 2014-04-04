angular.module('SignupCtrl', []).controller('SignupController', ['$scope', 'Login', function($scope, Login) {

  $scope.signup = function() {
    var result = Login.signup($scope.email, $scope.password);
  }

}]);