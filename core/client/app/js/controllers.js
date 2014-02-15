
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
            $http.get('project/list').success(function(projects) {
            $scope.projects = projects;
        });
    }

    // List of our invitation
   $scope.getInvitations = function() {
        $http.get('project/invitation').success(function(data) {
            $scope.invits = data.invits;
        });
    } 
    
    // Project to Database
    $scope.addProject = function() {
        $http.post('project/addProject', $scope.project).success(function(data) {
            $scope.flash = data.flash;
        });
        $pro = $scope.project;
        $scope.projects.push({'name': $scope.project.name});
    }

    // Accept invitation
    $scope.acceptInvit = function(invit) {
        $http.get('project/acceptInvitation/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
        })
    }
    
    // Refuse invitation
    $scope.refuseInvit = function(invit) {
        $http.get('project/refuseInvitation/' + invit.id).success(function(data) {
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
        $http.post('project/addUser/' + $routeParams.projectId, $scope.userAdd).success(function(data) {
            $scope.flash = data.flash;
        });
    }
 });

 // Management for tasks Page
 ProjectController.controller('ProjectTasks', function($scope, $http, $location, $routeParams) {

     $scope.projectId = $routeParams.projectId;

     // List of Tasks for our project
     $http.get('project/getTasks/' + $routeParams.projectId).success(function(tasks) {
        $scope.tasks = tasks;
     });


     // Task to Dabatase
     $scope.addTask = function() {
        $scope.task.projectId = $scope.projectId;
        $http.post('project/addTask', $scope.task).success(function(data) {
            $scope.flash = data.flash;
        });  
        $scope.tasks.push({'name': $scope.task.name, 'description': $scope.task.description, 'progress': '0',
        'dateLaunch': $scope.task.dateLaunch, 'dateEnd': $scope.task.dateEnd, 'importance_name': $scope.task.importance_name});
     }
 });

 // Management for task Page
 ProjectController.controller('ProjectTask', function($scope, $http, $location, $routeParams) {

     $scope.taskId = $routeParams.taskId;
     $scope.projectId = $routeParams.projectId;

     // Detail of our Task
     $http.get('project/getTask/' + $routeParams.taskId).success(function(task) {
        $scope.task = task;
     });

     //List of Comments for our Task
      $http.get('project/task/' + $routeParams.taskId + '/getComments').success(function(comments) {
        $scope.comments = comments;
     });

     // Update Task to Database
     $scope.updateTask = function() {
        $http.post('project/updateTask/' + $routeParams.taskId, $scope.task).success(function(data) {
            $scope.flash = data.flash;
        });
     }

     //Add comment to Databae
     $scope.addComment = function() {
        $http.post('project/task/' + $routeParams.taskId + '/addComment', $scope.comment).success(function(data) {
            $scope.flash = data.flash;
        });
     }
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
    $http.get('project/getLogs/' + $routeParams.projectId).success(function(data) {
      $scope.logs = data.logs;
    });

});

// Document Controller
// List of our Logs
ProjectController.controller('Documents', function($scope, $http, $routeParams) {

    $scope.projectId = $routeParams.projectId;

});

/*
        var fd = new FormData()
        fd.append("file", $scope.file)
        var xhr = new XMLHttpRequest()
        xhr.open("POST", "project/addDocument/" + $routeParams.projectId)
        xhr.send(fd)
        */

                 /* $http.post('project/addDocument/' + $routeParams.projectId, $scope.file).success(function(data) {
            $scope.flash=data.flash;
          });*/

/*
    $scope.addFile= function() {

         $http.post('project/addDocument/' + $routeParams.projectId, $scope.file).success(function(data) {
            $scope.flash=data.flash;
          });
    };
    */