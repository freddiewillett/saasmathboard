var app = angular.module('livecode', [
	'ngRoute',
	'firebase',
]);

angular.module('livecode').config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController',
		resolve: {
	  		AuthWaitForLogged: function(Auth) {
	  			return Auth.getAuth().$waitForSignIn();
	  		}
		}
	})
	.when('/main', {
		templateUrl: 'templates/main.html',
		controller: 'MainController',
		resolve: {
	  		AuthWaitForLogged: function(Auth) {
	  			return Auth.getAuth().$waitForSignIn();
	  		}
		}
	})
	.when('/profile', {
		templateUrl: 'templates/profile.html',
		controller: 'ProfileController',
		resolve: {
		  	AuthWaitForLogged: function(Auth) {
		  		return Auth.getAuth().$waitForSignIn();
	  		}
		}
	})
	.when('/chat/:chat_id', {
		templateUrl: 'templates/chat.html',
		controller: 'ChatController',
		resolve: {
	  		AuthWaitForLogged: function(Auth) {
	  			return Auth.getAuth().$waitForSignIn();
	  		}
		}
	})
	.otherwise('/')
});
