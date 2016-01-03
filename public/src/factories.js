angular.module('ContactsApp')
	.factory('Contact', function($resource){
		return $resource('/api/contact/:id', {id: '@id'},{
			'update':{ method: 'PUT' }
		});
	})
	.factory('TestData', function($resource){
		return $resource('http://jsonplaceholder.typicode.com/posts/:id',{id: '@id'});
	})
    .factory('UserFactory', function($resource){
        return $resource('/db/user/:id', {id: '@id'},{
            'update': { method: 'PUT' }
        });
    })