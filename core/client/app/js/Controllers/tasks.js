// ## Create TaskController
var TaskController = angular.module('TaskController', []);

// ## Controller for tasks.html
 TaskController.controller('ProjectTasks', function($scope, $http, $location, $routeParams) {

     $scope.projectId = $routeParams.projectId;

     // List of Tasks for our project
     $scope.getTasks = function() {
        $http.get('cleanz/api/' + $routeParams.projectId + '/tasks/list').success(function(tasks) {
        $scope.tasks = tasks;
       });
     }

     $scope.getTasks();
 });

// ## Controller for addTask.html 
TaskController.controller('addTask', function($scope, $http, $routeParams) {
     
    $scope.projectId = $routeParams.projectId;
    
     // Task to Dabatase
     $scope.addTask = function() {
        $scope.task.projectId = $scope.projectId;
        $scope.task.category = $scope.catId;
        $http.post('cleanz/api/' + $routeParams.projectId + '/tasks/add', $scope.task).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(error) {
            $scope.flash = error.flash;
        });
     }
});

// ## Controller for task.html
 TaskController.controller('ProjectTask', function($scope, $http, $location, $routeParams, DateService) {

     $scope.taskId = $routeParams.taskId;
     $scope.projectId = $routeParams.projectId;

     // Detail of our Task
     $http.get('/cleanz/api/' + $routeParams.projectId + '/tasks/' + $routeParams.taskId).success(function(task) {
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
      $http.get('/cleanz/api/' + $routeParams.projectId + '/comments/list/' + $routeParams.taskId).success(function(comments) {
        $scope.comments = comments;
      });
     }

     // Update Task to Database
     $scope.updateTask = function() {
        $scope.task.category = $scope.catId;
        $http.put('/cleanz/api/' + $routeParams.projectId + '/tasks/' + $routeParams.taskId, $scope.task).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
     }

     //Add comment to Databae
     $scope.addComment = function() {
      $scope.comment.taskId = $routeParams.taskId
        $http.post('cleanz/api/' + $routeParams.projectId + '/comments/add', $scope.comment).success(function(data) {
            $scope.flash = data.flash;
            $scope.getComments();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
     }

     $scope.getComments();
 });

// ## Controller for EditTask.html
 TaskController.controller('EditTask', function($scope, $http, $location, $routeParams, DateService) {

     $scope.taskId = $routeParams.taskId;
     $scope.projectId = $routeParams.projectId;

     // Detail of our Task
     $http.get('/cleanz/api/' + $routeParams.projectId + '/tasks/' + $routeParams.taskId).success(function(task) {
        $scope.task = task;
        var date = new Date(task.dateStart);
        var dateE = new Date(task.dateEnd);

        // format date
        $scope.task.dateStart = DateService.format(date);
        $scope.task.dateEnd = DateService.format(dateE);

        $scope.task.importance = task._importance.id;
        $scope.catId = $scope.task._category.id;
     });

     // Update Task to Database
     $scope.updateTask = function() {
        $http.put('/cleanz/api/' + $routeParams.projectId + '/tasks/' + $routeParams.taskId, $scope.task).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
     }
 });