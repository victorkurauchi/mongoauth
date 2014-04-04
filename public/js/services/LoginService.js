angular.module('LoginService', []).factory('Login', ['$http', function($http) {

  return {
  
    authenticate: function(user, pass) {
        
      // autenticacao
      // if (user && pass) {

      // }

      return true;

    },

    signup: function(user, pass) {

      var form = {

      };
      $http({
        method: 'post',
        url: '/signup',
        data: form
      }).
      success(function (data, status, headers, config) {
        $scope.cerveja = data;
        $scope.cervejas.push(data)
        $scope.msg = 'Cerveja: '+data.name
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }
    
  }
  
}]);