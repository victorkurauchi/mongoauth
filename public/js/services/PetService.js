angular.module('PetService', []).factory('Pet', ['$http', function($http) {

  return {
    // call to get all nerds
    get : function() {
      return $http.get('/api/pets');
    },

    // call to POST and create a new geek
    create : function(petData) {
      return $http.post('/api/pets', petData);
    },

    // call to DELETE a geek
    delete : function(id) {
      return $http.delete('/api/pets/' + id);
    }
  }

}]);