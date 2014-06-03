// ## Create TaskController
var TaskController = angular.module('TaskController', []);

// ## Controller for tasks.html
 TaskController.controller('ProjectTasks', function($scope, $http, $location, $routeParams, SortService) {
     $scope.flash = "";
     $scope.projectId = $routeParams.projectId;
     $scope.tasksCategories = new Array();
     $scope.tasksUser = new Array();

     // List of Tasks for our project
     $scope.getTasks = function() {
        $http.get('cleanz/api/' + $routeParams.projectId + '/tasks/list').success(function(tasks) {
        $scope.tasks = tasks;
        $scope.tasksInitial = tasks;
        
        $scope.getTasksByUser();
        $scope.getTasksByCategories();
       });
     }

     // get all categories for our project
     $scope.getCategories = function() {
        $http.get('cleanz/api/'+ $routeParams.projectId +'/categories/list').success(function(categories) {
            $scope.categories = categories;
            $scope.getTasks();
        });
     }

     // get firstName and lastName for our user
     $scope.getUser = function() {
        $http.get('/cleanz/api/users').success(function(user) {
            $scope.user = user.firstName + ' ' + user.lastName;
        });
     }

     // sort tasks by categories
     $scope.sortCategories = function(index) {
        $scope.tasks = $scope.tasksCategories[index];
     }

     //fill tab tasksCategories
     $scope.getTasksByCategories = function() {
        for (var i = 0 ; i < $scope.categories.length; i++) {
            $scope.tasksCategories.push(SortService.getSortCategories($scope.tasksInitial, $scope.categories[i].name));
        }
     }

     //show all tasks
     $scope.sortAllTasks = function() {
        $scope.tasks = $scope.tasksInitial;
     }

     //show all tasks for one user
     $scope.sortTasksByUser = function() {
        $scope.tasks = $scope.tasksUser;
     }

     //get all tasks for one user
     $scope.getTasksByUser =function() {
        $scope.tasksUser = SortService.getSortUser($scope.tasksInitial, $scope.user);
     }

     $scope.getUser();
     $scope.getCategories();
 });

// ## Controller for addTask.html 
TaskController.controller('addTask', function($scope, $http, $routeParams) {
    $scope.flash = "";
    $scope.projectId = $routeParams.projectId;
    
     // Task to Dabatase
     $scope.addTask = function() {
        $scope.task.projectId = $scope.projectId;
        $scope.task.category = $scope.catId;
        $scope.task.usersadd =  $scope.usersadd;
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
     $scope.flash = "";
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
     $scope.flash = "";
     $scope.taskId = $routeParams.taskId;
     $scope.projectId = $routeParams.projectId;
     $scope.usersadd = new Array();

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

        // add user which are already into the task
        for (var i = 0; i < task.users.length; i++) {
            $scope.usersadd.push(task.users[i].firstName + ' ' + task.users[i].lastName);
        }
     });

     // Update Task to Database
     $scope.updateTask = function() {
        $scope.task.importance = $scope.task.importance;
        $scope.task.usersadd =  $scope.usersadd;
        $scope.task.category = $scope.catId;
        $http.put('/cleanz/api/' + $routeParams.projectId + '/tasks/' + $routeParams.taskId, $scope.task).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
     }
 });