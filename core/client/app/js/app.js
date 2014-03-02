// ## Definition of Routes, Controllers and Services

var Cleanz = angular.module('Cleanz', [
  'ngRoute',
  'UserController','ProjectController','BugController','MeetingController'
  ,'DocumentController','LogController','TaskController','ProjectController',
  'CleanzServices',
  'angularFileUpload',
]);

// ## Router
Cleanz.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/partials/users.html',
        controller: 'UsersList'
      }).
      when('/register', {
        templateUrl: 'app/partials/register.html',
        controller: 'UsersList'
      }).
      when ('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'Login'
      }).
      when('/editinfo', {
        templateUrl: 'app/partials/editinfo.html',
        controller: 'EditUserInfo'
      }).
      when ('/project', {
        templateUrl: 'app/partials/project.html',
        controller: 'ProjectsList'
      }).
      when ('/project/:projectId', {
        templateUrl: 'app/partials/projectBoard.html',
        controller: 'ProjectBoard'
      }).
      when ('/project/:projectId/tasks', {
        templateUrl: 'app/partials/tasks.html',
        controller: 'ProjectTasks'
      }).
      when ('/project/:projectId/tasks/:taskId', {
        templateUrl: 'app/partials/task.html',
        controller: 'ProjectTask'
      }).
      when ('/project/:projectId/meetings', {
        templateUrl: 'app/partials/meetings.html',
        controller: 'Meetings'
      }).
        when ('/project/:projectId/meetings/:meetingId', {
        templateUrl: 'app/partials/meeting.html',
        controller: 'Meeting'
      }).
       when ('/project/:projectId/addMeeting', {
        templateUrl: 'app/partials/addMeeting.html',
        controller: 'AddMeeting'
      }).
        when ('/project/:projectId/editMeeting/:meetingId', {
        templateUrl: 'app/partials/editMeeting.html',
        controller: 'EditMeeting'
      }).
       when ('/project/:projectId/logs', {
        templateUrl: 'app/partials/logs.html',
        controller: 'Logs'
       }).
        when ('/project/:projectId/documents', {
        templateUrl: 'app/partials/documents.html',
        controller: 'Documents'
       }).
       when ('/project/:projectId/addDocument', {
        templateUrl: 'app/partials/addDocument.html',
        controller: 'AddDocument'
       }).
       when ('/project/:projectId/bugs', {
        templateUrl: 'app/partials/bugs.html',
        controller: 'Bugs'
       }).
        when ('/project/:projectId/bugs/:bugId', {
        templateUrl: 'app/partials/bug.html',
        controller: 'Bug'
       }).
       when ('/project/:projectId/addBug', {
        templateUrl: 'app/partials/addBug.html',
        controller: 'addBug'
       }).
       when ('/project/:projectId/editBug/:bugId', {
        templateUrl: 'app/partials/editBug.html',
        controller: 'EditBug'
       });

  }]);


 // ## Routes wich require Auth
Cleanz.run(function($rootScope, $location, AuthenticationService) {

  var routesThatRequireAuth = ['/project', '/editinfo'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
    }
  });
});
