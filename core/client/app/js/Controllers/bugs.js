// ## Create BugController
var BugController = angular.module('BugController', []);

// ## Controller for bugs.html
BugController.controller('Bugs', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	// get list of our bugs
	$scope.getBugs = function() {
		$http.get('/cleanz/api/' + $routeParams.projectId + '/bugs/list').success(function(bugs) {
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

	$scope.projectId = $routeParams.projectId;
	$scope.bugId = $routeParams.bugId;

	// get detail for one bug
	$http.get('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId).success(function(bug) {
		$scope.bug = bug;
	});
});

// ## Controller for editBug.html 
BugController.controller('EditBug', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;
	$scope.bugId = $routeParams.bugId;

	// get detail for one bug
	$http.get('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId).success(function(bug) {
		$scope.bug = bug;
		$scope.catId = $scope.bug._category.id;
	});

	// modify bug into database
	$scope.editBug = function() {
		$scope.bug.projectId = $routeParams.projectId;
		$scope.bug.category = $scope.catId;
		$http.put('/cleanz/api/' + $routeParams.projectId + '/bugs/' + $routeParams.bugId, $scope.bug).success(function(data) {
			$scope.flash = data.flash;
		}).error(function(data) {
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