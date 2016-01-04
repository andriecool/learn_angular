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

    .controller('UserController', function($scope, $location, UserFactory){
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

    .controller('UserDetailController', function($scope, $location, UserFactory, $routeParams){
        $scope.$parent.title = "User Detail";
        $scope.user = UserFactory.get({id: parseInt($routeParams.id)});

        $scope.back = function(){
            $location.url('/user');
        }
    })

    .controller('UserNewController', function($scope, $location, UserFactory){
        $scope.$parent.title = "Add New User";

        $scope.user = new UserFactory({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            cell: '',
            birthday: ''
        })

        $scope.save = function(){
            $scope.user.$save();
            $scope.reset();
        }

        $scope.back = function(){
            $location.url('/user')
        }

    });