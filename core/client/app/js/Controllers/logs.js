// ## Create LogController
var LogController = angular.module('LogController', []);

// ## Controller for logs.html
LogController.controller('Logs', function($scope, $http, $routeParams) {
	$scope.flash = "";

    $scope.projectId = $routeParams.projectId;

    //List of our logs
    $http.get('/cleanz/api/' + $routeParams.projectId + '/logs/list').success(function(logs) {
      $scope.logs = logs  ;
    });

});

