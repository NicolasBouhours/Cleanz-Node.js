// ## Definition of Routes, Controllers and Services

var Cleanz = angular.module('Cleanz', [
  'ngRoute',
  'UserController',
  'ProjectController',
  'BugController',
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
        controller: 'ProjectMeetings'
      }).
       when ('/project/:projectId/addMeeting', {
        templateUrl: 'app/partials/addMeeting.html',
        controller: 'addMeeting'
      }).
       when ('/project/:projectId/logs', {
        templateUrl: 'app/partials/logs.html',
        controller: 'Logs'
       }).
       when ('/project/:projectId/documents', {
        templateUrl: 'app/partials/documents.html',
        controller: 'Documents'
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
       }).
        otherwise({
        redirectTo: '/'
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

// ## Flash Service
Cleanz.factory('FlashService', function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

// ## Session Service
Cleanz.factory('SessionService', function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  };
});

// ## Authentification Service
Cleanz.factory('AuthenticationService', function($http, $location, SessionService, FlashService) {
  var cacheSession = function() {
    SessionService.set('authenticated', true);
  };
  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  }

  return {
    login: function(creditentials) {
      var login = $http.post('/cleanz/login', creditentials);
      login.success(cacheSession);
      login.error(loginError);
      return login;
  },
    logout: function() {
      var logout = $http.get('/cleanz/logout');
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});

// ## Format date
Cleanz.factory('DateService', function() {
  return {
    format: function(date) {
      if (date.getMonth() < 10 && date.getDate() < 10) {
        return date.getFullYear() + '-0' + (date.getMonth() + 1) + '-0' + date.getDate();
      }
      else if (date.getMonth() < 10) {
        return date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate(); 
      }
      else if (date.getDate() < 10) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-0' + date.getDate();         
      }
      else {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();    
      }
    }
  };
});
