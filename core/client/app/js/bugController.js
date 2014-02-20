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
			$scope.bugs = bugs;
			$scope.flash = data.flash;
		});
	}

});