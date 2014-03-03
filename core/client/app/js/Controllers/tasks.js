// ## Create TaskController
var TaskController = angular.module('TaskController', []);

// ## Controller for tasks.html
 TaskController.controller('ProjectTasks', function($scope, $http, $location, $routeParams) {

     $scope.projectId = $routeParams.projectId;

     // List of Tasks for our project
     $scope.getTasks = function() {
        $http.get('cleanz/api/tasks/list/' + $scope.projectId).success(function(tasks) {
        $scope.tasks = tasks;
       });
     }

     // Task to Dabatase
     $scope.addTask = function() {
        $scope.task.projectId = $scope.projectId;
        $http.post('cleanz/api/tasks/add', $scope.task).success(function(data) {
            $scope.flash = data.flash;
            $scope.getTasks();
        }).error(function(error) {
            $scope.flash = error.flash;
        });
     }

     $scope.getTasks();
 });

// ## Controller for task.html
 TaskController.controller('ProjectTask', function($scope, $http, $location, $routeParams, DateService) {

     $scope.taskId = $routeParams.taskId;
     $scope.projectId = $routeParams.projectId;

     // Detail of our Task
     $http.get('/cleanz/api/tasks/' + $routeParams.taskId).success(function(task) {
        $scope.task = task;
        var date = new Date(task.dateStart);
        var dateE = new Date(task.dateEnd);

        // format date
        $scope.task.dateStart = DateService.format(date);
        $scope.task.dateEnd = DateService.format(dateE);

        $scope.task.importance = task._importance.id;
     });

     // Get comments for our task
     $scope.getComments = function() {
      $http.get('/cleanz/api/comments/list/' + $routeParams.taskId).success(function(comments) {
        $scope.comments = comments;
      });
     }

     // Update Task to Database
     $scope.updateTask = function() {
        $http.put('/cleanz/api/tasks/' + $routeParams.taskId, $scope.task).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
     }

     //Add comment to Databae
     $scope.addComment = function() {
      $scope.comment.taskId = $routeParams.taskId
        $http.post('cleanz/api/comments/add', $scope.comment).success(function(data) {
            $scope.flash = data.flash;
            $scope.getComments();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
     }

     $scope.getComments();
 });