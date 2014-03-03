// ## Create LogController
var LogController = angular.module('LogController', []);

// ## Controller for logs.html
LogController.controller('Logs', function($scope, $http, $routeParams) {

    $scope.projectId = $routeParams.projectId;

    //List of our logs
    $http.get('/cleanz/api/logs/list/' + $routeParams.projectId).success(function(logs) {
      $scope.logs = logs  ;
    });

});

