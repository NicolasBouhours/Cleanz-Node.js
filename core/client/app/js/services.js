var CleanzServices = angular.module('CleanzServices', []);

// ## Flash Service
CleanzServices.factory('FlashService', function($rootScope) {
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
CleanzServices.factory('SessionService', function() {
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
CleanzServices.factory('AuthenticationService', function($http, $location, SessionService, FlashService) {
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
CleanzServices.factory('DateService', function() {
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

// ## File Service
CleanzServices.factory('FileService', function() {
  return {
    getExtention: function(name) {
      var tab = name.split('.');
      return tab[tab.length-1];
    }
  };
});

// ## Dashboard Services
CleanzServices.factory('DashboardService', function() {
  return {

    //get tasks which progress isn't 100%
    getTasksUncompleted: function(tasks) {
      var tasksUncompleted = new Array();

      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].progress != '100') {
          tasksUncompleted.push(tasks[i]);
        }
      }
      return tasksUncompleted;
    },

    // get bugs which aren't resolved
    getBugsUnresolved: function(bugs) {
      var bugsUnresolved = new Array();

      for (var i = 0; i < bugs.length; i++) {
        if (bugs[i].resolve == '0') {
          bugsUnresolved.push(bugs[i]);
        }
      }
      return bugsUnresolved;
    },

    // get meetings which date isn't passed
    getNextMeetings: function(meetings) {
      var nextMeetings = new Array();
      var dateNow = new Date();

      for (var i = 0; i < meetings.length; i++) {
        var dateMet = new Date(meetings[i].dateStart);
        if (dateNow < dateMet) {
          nextMeetings.push(meetings[i]);
        }
      }

      return nextMeetings;
    }
  };
});

// ## Sort Services
CleanzServices.factory('SortService', function() {
  return {
    // return tasks for where user is assigned
    getSortUser: function(data, name) {
      var sortUsers = new Array();

      for (var i = 0; i < data.length; i++) {
        for (var p = 0; p < data[i].users.length; p++) {
          if ((data[i].users[p].firstName + ' ' + data[i].users[p].lastName) == name) {
            sortUsers.push(data[i]);
          }
        }
      }

      return sortUsers;
    },

    //return data for this category
    getSortCategories: function(data, category) {
      var sortCategories = new Array();

      for(var i = 0; i < data.length; i++) {
        if (data[i]._category != null) {
          if (data[i]._category.name == category) {
            sortCategories.push(data[i]);
          }
        }
      }

      return sortCategories;
    },

    getSortTaskProgress: function(data) {
      var sortTaskProgress = new Array();

      for(var i = 0; i < data.length; i++) {
        if (data[i].progress != '100') {
          sortTaskProgress.push(data[i]);
        }
      }

      return sortTaskProgress;
    },

    getSortMeetingDate: function(data) {
      var sortMeetingDate = new Array();
      var dateNow = new Date();

      for(var i = 0; i < data.length; i++) {
        var date = new Date(data[i].dateStart);
        if (dateNow < date) {
          sortMeetingDate.push(data[i]);
        }
      }

      return sortMeetingDate;
    },

    getSortBugUnresolved: function(data) {
      var sortBugUnresolved = new Array();

      for(var i = 0; i < data.length; i++) {
        if (data[i].resolve != 'Oui') {
          sortBugUnresolved.push(data[i]);
        }
      }

      return sortBugUnresolved;
    },
  };
});