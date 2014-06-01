// ## Create BugController
var BugController = angular.module('BugController', []);

// ## Controller for bugs.html
BugController.controller('Bugs', function($scope, $http, $routeParams) {
	 $scope.flash = "";

	$scope.projectId = $routeParams.projectId;

	// modify resolve to Oui ou Non
	$scope.translateResolve = function(bugs) {

		for (var i = 0; i < bugs.length; i++) {
			if (bugs[i].resolve == '0') {
				bugs[i].resolve = 'Non';
			}
			else {
				bugs[i].resolve = 'Oui';
			}
		}
		return bugs;
	}

	// get list of our bugs
	$scope.getBugs = function() {
		$http.get('/cleanz/api/' + $routeParams.projectId + '/bugs/list').success(function(bugs) {
			$scope.bugs = $scope.translateResolve(bugs);
		});
	}

	$scope.getBugs();
});

// ## Controller for addBug.html
BugController.controller('addBug', function($scope, $http, $routeParams) {
	 $scope.flash = "";

	$scope.projectId = $routeParams.projectId;

	// get list of our bugs
	$scope.addBug = function() {
		$scope.bug.projectId = $routeParams.projectId;
		$scope.bug.category = $scope.catId;
		$scope.bug.usersadd =  $scope.usersadd;
		$http.post('/cleanz/api/' + $routeParams.projectId + '/bugs/add', $scope.bug).success(function(data) {
			$scope.flash = data.flash;
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}
});

// ## Controller for bug.html
BugController.controller('Bug', function($scope, $http, $routeParams) {
	 $scope.flash = "";

	$scope.projectId = $routeParams.projectId;
	$scope.bugId = $routeParams.bugId;

	// modify resolve to Oui ou Non
	$scope.translateResolve = function() {
		if ($scope.bug.resolve == '0') {
			$scope.bug.resolve = 'Non';
		}
		else {
			$scope.bug.resolve = 'Oui';
		}
	}

	// get detail for one bug
	$http.get('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId).success(function(bug) {
		$scope.bug = bug;
		$scope.translateResolve();
	});
});

// ## Controller for editBug.html 
BugController.controller('EditBug', function($scope, $http, $routeParams) {
	 $scope.flash = "";

	$scope.projectId = $routeParams.projectId;
	$scope.bugId = $routeParams.bugId;

	// modify resolve to Oui ou Non
	$scope.translateResolve = function() {
		if ($scope.bug.resolve == '0') {
			$scope.bug.resolve = 'Non';
		}
		else {
			$scope.bug.resolve = 'Oui';
		}
	}
	
	// get detail for one bug
	$http.get('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId).success(function(bug) {
		$scope.bug = bug;
		$scope.catId = $scope.bug._category.id;
		$scope.translateResolve();

		// add user which are already into the bug
        for (var i = 0; i < bug.users.length; i++) {
            $scope.usersadd.push(bug.users[i].firstName + ' ' + bug.users[i].lastName);
        }
	});

	// modify bug into database
	$scope.editBug = function() {
		$scope.bug.projectId = $routeParams.projectId;
		$scope.bug.category = $scope.catId;
		$scope.bug.usersadd =  $scope.usersadd;

		// modify resolve to Oui ou Non
		if ($scope.bug.resolve == 'Non') {
			$scope.bug.resolve = '0';
		}
		else {
			$scope.bug.resolve = '1';
		}

		$http.put('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId, $scope.bug).success(function(data) {
			$scope.translateResolve();
			$scope.flash = data.flash;
		}).error(function(data) {
			$scope.translateResolve();
            $scope.flash = data.flash;
        });
	}

	// remove bug into database
	$scope.removeBug = function() {
		$http.delete('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId).success(function(data) {
			$scope.flash = data.flash;
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}

});