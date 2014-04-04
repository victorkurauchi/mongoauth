angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/petshop', {
			templateUrl: 'views/petshop.html',
			controller: 'PetshopController'	
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'	
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignupController'	
		})

		.when('/pets', {
			templateUrl: 'views/pets.html',
			controller: 'PetController'	
		});

	$locationProvider.html5Mode(true);

}]);