angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
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

		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'	
		});

	$locationProvider.html5Mode(true);

}]);