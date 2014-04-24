angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/section/teste',
			controller: 'MainController'
		})

		.when('/login', {
			templateUrl: 'views/section/login',
			controller: 'LoginController'	
		})

		.when('/signup', {
			templateUrl: 'views/section/signup',
			controller: 'SignupController'	
		})

		.when('/usuario', {
			templateUrl: 'views/section/users',
			controller: 'UserController'	
		});

	$locationProvider.html5Mode(true);

}]);