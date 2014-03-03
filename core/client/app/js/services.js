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

// ## Security Service
CleanzServices.factory('SecurityService', function($http, $location) {
	return {
		checkUserProject: function(id) {
			var checkUserProject = $http.get('/cleanz/security/' + id);
			if (login.error) {
				$location.path('/404');
			}
		}
	};
});