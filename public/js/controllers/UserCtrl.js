angular.module('UserCtrl', []).controller('UserController', ['$scope', function($scope) {

  /*Pet.get().then(function(result) {
    $scope.pets = result.data;
  });

  $scope.add = function() {

    Pet.create($scope.pet).then(function(result) {
      
      $scope.message = 'Pet cadastrado com sucesso :) ';
      Pet.get();
    })
    
  }*/

  console.log('Controller Instanciada');

  $scope.tagline = 'Olloko bixo.';

}]);