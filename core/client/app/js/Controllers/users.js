// ## Create UserController
var UserController = angular.module('UserController', []);

// ## Controller for register.html
UserController.controller('UsersList', function($scope, AuthenticationService, $http, $location) {
   
    // List of all users
   $http.get('cleanz/api/users/list').success(function(users) {
     $scope.users = users;
    });

    // User to Database
    $scope.register = function() {
 	    $http.post('cleanz/api/users/add', $scope.user).success(function(data) {
        $scope.flash = data.flash;
        $location.path('/login');

        // if bad information
      }).error(function(data) {
            $scope.flash = data.flash;
      });
    }

    //Logout User
    $scope.logout = function() {
    	AuthenticationService.logout().success(function() {
			$location.path('login');
		});
    }
});


// ## Controller for login.html
UserController.controller('Login', function($scope, AuthenticationService, $location) {
	$scope.login = function() {
		AuthenticationService.login($scope.user).success(function(data) {
			$location.path('project');
            $scope.flash = data.flash;
		});
	}
});

// ## Controller for login.html
UserController.controller('Logout', function(AuthenticationService, $location) {
        AuthenticationService.logout().success(function() {
            $location.path('/login');
        });
});

// ## Controller for editinfo.html
UserController.controller('EditUserInfo', function($scope, $http) {
    // Get information about our user
    var getInfoUser = function () { 
      $http.get('/cleanz/api/users').success(function(user) {
        $scope.user = user;
    });
  }


    
    //Edit all user information without password
    $scope.editInfoUser = function() {
        $http.put('/cleanz/api/users', $scope.user).success(function(user) {
            $scope.user = user;
            $scope.flash = user.flash;
            getInfoUser();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }

    //Edit user password
    $scope.editPasswordUser = function() {
        $http.put('/cleanz/api/users/editPassword', $scope.user).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
             $scope.flash = data.flash;
        });
    }
    getInfoUser();
    
});