// ## Create ProjectController
var ProjectController = angular.module('ProjectController', []);

// ## Controller for project.html
 ProjectController.controller('ProjectsList', function($scope, $http, $location) {

    $scope.showAddTask = false;

    // List of all project of one user
    $scope.getProjects = function() {
            $http.get('/cleanz/api/projects/list').success(function(data) {
            $scope.projects = data.projects;
        });
    }

    // List of our invitation
   $scope.getInvitations = function() {
        $http.get('cleanz/api/invits/list').success(function(data) {
            $scope.invits = data.invits;
        });
    } 
    
    // Project to Database
    $scope.addProject = function() {
        $http.post('/cleanz/api/projects/add', $scope.project).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
            $scope.showAddTask = false;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }

    // Accept invitation
    $scope.acceptInvit = function(invit) {
        $http.put('cleanz/api/invits/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
            $scope.getInvitations();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }
    
    // Refuse invitation
    $scope.refuseInvit = function(invit) {
        $http.delete('cleanz/api/invits/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getInvitations();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }

    // Show addTask form
    $scope.addTaskShow = function() {
        $scope.showAddTask = true;
    }

    // Hide addTask form
    $scope.addTaskHide = function() {
        $scope.showAddTask = false;
    }

    $scope.getInvitations();
    $scope.getProjects();
});

// ## Controller for projectBoard.html
 ProjectController.controller('ProjectBoard', function($scope, $http, $location, $routeParams) {

    $scope.projectId = $routeParams.projectId;

    // Send invitation for one user
    $scope.addProjectUser = function() {
      $scope.userAdd.projectId = $routeParams.projectId;
        $http.post('cleanz/api/invits/add', $scope.userAdd).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }
 });
