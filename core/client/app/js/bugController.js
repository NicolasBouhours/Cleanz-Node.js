var BugController = angular.module('BugController', []);

// ## Controller for bugs.html
BugController.controller('Bugs', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	// get list of our bugs
	$scope.getBugs = function() {
		$http.get('/cleanz/api/bugs/list/' + $routeParams.projectId).success(function(bugs) {
			$scope.bugs = bugs;
		});
	}

	$scope.getBugs();
});

// ## Controller for addBug.html
BugController.controller('addBug', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	// get list of our bugs
	$scope.addBug = function() {
		$scope.bug.projectId = $routeParams.projectId;
		$http.post('/cleanz/api/bugs/add', $scope.bug).success(function(data) {
			$scope.flash = data.flash;
		});
	}

});

// ## Controller for bug.html
BugController.controller('Bug', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;
	$scope.bugId = $routeParams.bugId;

	// get detail for one bug
	$http.get('/cleanz/api/bugs/' + $routeParams.bugId).success(function(bug) {
		$scope.bug = bug;
	});
});

// ## Controller for editBug.html 
BugController.controller('EditBug', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;
	$scope.bugId = $routeParams.bugId;

	// get detail for one bug
	$http.get('/cleanz/api/bugs/' + $routeParams.bugId).success(function(bug) {
		$scope.bug = bug;
	});

	// modify bug into database
	$scope.editBug = function() {
		$scope.bug.projectId = $routeParams.projectId;
		$http.put('/cleanz/api/bugs/' + $routeParams.bugId, $scope.bug).success(function(data) {
			$scope.flash = data.flash;
		});
	}

	// remove bug into database
	$scope.removeBug = function() {
		$http.delete('/cleanz/api/bugs/' + $routeParams.bugId).success(function(data) {
			$scope.flash = data.flash;
		});
	}
});