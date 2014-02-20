
// Management for Users and Authentification
var UserController = angular.module('UserController', []);

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
      });
    }

    //Logout User
    $scope.logout = function() {
    	AuthenticationService.logout().success(function() {
			$location.path('login');
		});
    }
});

// Login for User
UserController.controller('Login', function($scope, AuthenticationService, $location) {
	$scope.login = function() {
		AuthenticationService.login($scope.user).success(function() {
			$location.path('project');
		});
	}
});

// Edition for user's information
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
        });
    }

    //Edit user password
    $scope.editPasswordUser = function() {
        $http.put('/cleanz/api/users/editPassword', $scope.user).success(function(data) {
            $scope.flashpwd = data.flash;
        }).error(function(data) {
            $scope.flashpwd = data.flash;
        });
    }
    getInfoUser();
    
});

// Management for our project
var ProjectController = angular.module('ProjectController', []);

// List of project for users
 ProjectController.controller('ProjectsList', function($scope, $http, $location) {

    // List of all project of one user
    $scope.getProjects = function() {
            $http.get('/cleanz/api/projects/list').success(function(data) {
            $scope.projects = data.projects;
        });
    }

    // List of our invitation
   $scope.getInvitations = function() {
        $http.get('cleanz/api/invits/list').success(function(data) {
            $scope.invits = data.projects;
        });
    } 
    
    // Project to Database
    $scope.addProject = function() {
        $http.post('/cleanz/api/projects/add', $scope.project).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
        });
    }

    // Accept invitation
    $scope.acceptInvit = function(invit) {
        $http.put('cleanz/api/invits/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
            $scope.getInvitations();
        })
    }
    
    // Refuse invitation
    $scope.refuseInvit = function(invit) {
        $http.delete('cleanz/api/invits/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getInvitations();
        });
    }

    $scope.getInvitations();
    $scope.getProjects();
});

// Management for Board Page
 ProjectController.controller('ProjectBoard', function($scope, $http, $location, $routeParams) {

    $scope.projectId = $routeParams.projectId;

    // Send invitation for one user
    $scope.addProjectUser = function() {
      $scope.userAdd.projectId = $routeParams.projectId;
        $http.post('cleanz/api/project/addUser', $scope.userAdd).success(function(data) {
            $scope.flash = data.flash;
        });
    }
 });

 // Management for tasks Page
 ProjectController.controller('ProjectTasks', function($scope, $http, $location, $routeParams) {

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
        });  
     }

     $scope.getTasks();
 });

 // Management for task Page
 ProjectController.controller('ProjectTask', function($scope, $http, $location, $routeParams, DateService) {

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
        });
     }

     //Add comment to Databae
     $scope.addComment = function() {
      $scope.comment.taskId = $routeParams.taskId
        $http.post('cleanz/api/comments/add', $scope.comment).success(function(data) {
            $scope.flash = data.flash;
            $scope.getComments();
        });
     }

     $scope.getComments();
 });

 // Adding meetings
 ProjectController.controller('addMeeting', function($scope, $http, $location, $routeParams) {

    $scope.projectId = $routeParams.projectId;

    $scope.addMeeting = function() {
        $scope.meeting.projectId = $scope.projectId;
        $http.post('project/meeting/addMeeting', $scope.meeting).success(function(data) {
            $scope.flash = data.flash;
        });
    }
 });

// List of our meetings
ProjectController.controller('ProjectMeetings', function($scope, $http, $location, $routeParams) {

    $scope.projectId = $routeParams.projectId;

    //List of our meetings
     $http.get('project/getMeetings/' + $routeParams.projectId).success(function(meetings) {
        $scope.meetings = meetings;
    });
});

// List of our Logs
ProjectController.controller('Logs', function($scope, $http, $routeParams) {

    $scope.projectId = $routeParams.projectId;


    //List of our logs
    $http.get('/cleanz/api/logs/list/' + $routeParams.projectId).success(function(logs) {
      $scope.logs = logs;
    });

});

// Document Controller
// List of our Logs
ProjectController.controller('Documents', function($scope, $http, $routeParams) {

    $scope.projectId = $routeParams.projectId;

});
