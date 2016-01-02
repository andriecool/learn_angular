angular.module('ContactsApp',['ngRoute', 'ngResource', 'ngMessages'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			.when('/contact', {
				controller: 'ListController',
				templateUrl: 'views/list.html'
			})
			.when('/contact/new', {
				controller: 'NewController',
				templateUrl: 'views/new.html'
			})
			.when('/test',{
				controller: 'TestController',
				templateUrl: 'views/test.html'
			})
			.when('/test/:id',{
				controller: 'TestDetailController',
				templateUrl: 'views/test-detail.html'
			})
		$locationProvider.html5Mode(true);
	});