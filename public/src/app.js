angular.module('myApp',['ngRoute', 'ngResource', 'ngMessages'])
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

            // test
			.when('/test',{
				controller: 'TestController',
				templateUrl: 'views/test.html'
			})
			.when('/test/:id',{
				controller: 'TestDetailController',
				templateUrl: 'views/test-detail.html'
			})

            //user
            .when('/user', {
                controller: 'UserController',
                templateUrl: 'views/user.html'
            })
            .when('/user/new',{
                controller: 'UserNewController',
                templateUrl: 'views/user-new.html'
            })
            .when('/user/:id',{
                controller: 'UserDetailController',
                templateUrl: 'views/user-new.html'
            })

            // stream
            .when('/stream',{
                controller: 'StreamController',
                templateUrl: 'stream.html'
            })

		$locationProvider.html5Mode(true);
	});