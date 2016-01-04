angular.module('ContactsApp')
	
	.controller('ListController', function($scope, $rootScope, Contact, $location){
        $rootScope.PAGE = 'contact';
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
	
	.controller('NewController', function($scope, $rootScope, Contact, $location){
        $rootScope.PAGE = 'contact';
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
		});

		$scope.save = function(){
			if($scope.newContact.$invalid){
				$scope.$broadcast('record:invalid')
			} else {
				$scope.contact.$save();
				$location.url('/contacts');
			}
		}
	})
	
	.controller('TestController', function($scope, $rootScope, $location, TestData){
        $rootScope.PAGE = 'test';
        $scope.$parent.title = "Test Page";
		$scope.tests = TestData.query();

		$scope.show = function(id){
			$location.url('/test/' + id)
		}
	})

	.controller('TestDetailController', function($scope, $rootScope, $location, TestData, $routeParams){
        $rootScope.PAGE = 'test';
        $scope.testId = $routeParams.id;
		$scope.$parent.title = "Test Detail Page";
		$scope.test = TestData.get({id: parseInt($scope.testId)});

		$scope.back = function(){
			$location.url('/test');
		}
	})

    .controller('UserController', function($scope, $rootScope, $location, UserFactory){
        $rootScope.PAGE = 'user';
        $scope.$parent.title = "Users";
        $scope.users = UserFactory.query();

        $scope.show = function(id){
            $location.url('/user/'+id)
        }

        $scope.add = function(){
            $location.url('/user/new');
        }

        $scope.rowLimit = 10;
        $scope.rowOffset = 0;

        $scope.paginationPrev = function(){
            if($scope.rowOffset > 0){
                $scope.rowOffset = $scope.rowOffset - $scope.rowLimit;
            }
        }

        $scope.paginationNext = function(){
            if($scope.rowOffset < $scope.users.length){
                $scope.rowOffset = $scope.rowOffset + $scope.rowLimit;
            }
        }
    })

    .controller('UserDetailController', function($scope, $rootScope, $location, UserFactory, $routeParams){
        $rootScope.PAGE = 'user';
        $scope.$parent.title = "User Detail";
        $scope.user = UserFactory.get({id: parseInt($routeParams.id)});
        $scope.deleteOption = true;

        $scope.save = function(){
            $scope.user.$update({id: $scope.user.userId});
            $scope.message = "User updated: "+$scope.user.firstName+" "+$scope.user.lastName;
            $scope.alertClass = "success";
        }

        $scope.back = function(){
            $location.url('/user')
        }

        $scope.delete = function(){
            $scope.user.$delete({id: $scope.user.userId});
            //$scope.message = "Successfully deleted user "+$scope.user.firstName+" "+$scope.user.lastName;
            //$scope.alertClass = "success";
            $location.url('/user');
        }
    })

    .controller('UserNewController', function($scope, $rootScope, $location, UserFactory){
        $rootScope.PAGE = 'user';
        $scope.$parent.title = "Add New User";
        $scope.user = new UserFactory();

        $scope.save = function(){
            $scope.user.$save();
            $scope.message = "User added: "+$scope.user.firstName+" "+$scope.user.lastName;
            $scope.alertClass = "success";
            $scope.user = null;

        }

        $scope.back = function(){
            $location.url('/user')
        }

    });