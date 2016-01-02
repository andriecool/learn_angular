angular.module('ContactsApp')
	
	.controller('ListController', function($scope, Contact, $location){
		$scope.$parent.title = "Contact";
		$scope.contacts = Contact.query();
		$scope.fields = ['firstName', 'lastName'];

		$scope.sort = function(field){
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		}

		$scope.sort.field = 'firstName';
		$scope.sort.order = false;

		$scope.show = function(id){
			$location.url('/contact/' + id);
		}
	})
	
	.controller('NewController', function($scope, Contact, $location){
		$scope.$parent.title = "Contact";
		$scope.contact = new Contact({
			firstName: 	['', 'text'],
			lastName: 	['', 'text'],
			email: 		['', 'email'],
			homePhone: 	['', 'tel'],
			cellPhone: 	['', 'tel'],
			birthday: 	['', 'date'],
			website: 	['', 'url'],
			address: 	['', 'text']
		})

		$scope.save = function(){
			if($scope.newContact.$invalid){
				$scope.$broadcast('record:invalid')
			} else {
				$scope.contact.$save();
				$location.url('/contacts');
			}
		}
	})
	
	.controller('TestController', function($scope, $location, TestData){
		$scope.$parent.title = "Test Page";
		$scope.tests = TestData.query();

		$scope.show = function(id){
			$location.url('/test/' + id)
		}
	})

	.controller('TestDetailController', function($scope, $location, TestData, $routeParams){
		$scope.testId = $routeParams.id;
		$scope.$parent.title = "Test Detail Page";
		$scope.test = TestData.get({id: parseInt($scope.testId)});

		$scope.back = function(){
			$location.url('/test');
		}
	})