angular.module('PetCtrl', []).controller('PetController', ['$scope', 'Pet', function($scope, Pet) {

  Pet.get().then(function(result) {
    $scope.pets = result.data;
  });

  $scope.add = function() {

    Pet.create($scope.pet).then(function(result) {
      
      $scope.message = 'Pet cadastrado com sucesso :) ';
      Pet.get();
    })
    
  }

}]);