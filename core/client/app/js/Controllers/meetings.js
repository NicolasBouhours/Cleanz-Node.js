// ## Create MeetingController
var MeetingController = angular.module('MeetingController', []);

// ## Controller for meetings.html
MeetingController.controller('Meetings', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	// get list of our meetings
	$scope.getMeetings = function() {
		$http.get('/cleanz/api/' + $routeParams.projectId + '/meetings/list').success(function(meetings) {
			$scope.meetings = meetings;
		});
	}

	$scope.getMeetings();
});

// ## Controller for addMeeting.html
MeetingController.controller('AddMeeting', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	// get list of our meetings
	$scope.addMeeting = function() {
		$scope.meeting.projectId = $routeParams.projectId;
		$scope.meeting.category = $scope.catId;
		$scope.meeting.usersadd =  $scope.usersadd;
		$http.post('/cleanz/api/' + $routeParams.projectId + '/meetings/add', $scope.meeting).success(function(data) {
			$scope.flash = data.flash;
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}

});

// ## Controller for meeting.html
MeetingController.controller('Meeting', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;
	$scope.meetingId = $routeParams.meetingId;

	// get detail for one meeting
	$http.get('/cleanz/api/' + $routeParams.projectId + '/meetings/' + $routeParams.meetingId).success(function(meeting) {
		$scope.meeting = meeting;
	});
});

// ## Controller for editMeeting.html 
MeetingController.controller('EditMeeting', function($scope, $http, $routeParams, $location,DateService) {

	$scope.projectId = $routeParams.projectId;
	$scope.meetingId = $routeParams.meetingId;
	// get detail for one meeting
	$http.get('/cleanz/api/' + $routeParams.projectId + '/meetings/' + $routeParams.meetingId).success(function(meeting) {
		$scope.meeting = meeting;
		$scope.catId = meeting._category.id;

        // format date
		var date = new Date(meeting.dateStart);
        $scope.meeting.dateStart = DateService.format(date);

        // add user which are already into the meeting
        for (var i = 0; i < meeting.users.length; i++) {
            $scope.usersadd.push(meeting.users[i].firstName + ' ' + meeting.users[i].lastName);
        }
	});

	// modify meeting into database
	$scope.editMeeting = function() {
		$scope.meeting.projectId = $routeParams.projectId;
		$scope.meeting.category = $scope.catId;
		$scope.meeting.usersadd =  $scope.usersadd;
		$http.put('/cleanz/api/' + $routeParams.projectId + '/meetings/' + $routeParams.meetingId, $scope.meeting).success(function(data) {
			$scope.flash = data.flash;
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}

	// remove meeting into database
	$scope.removeMeeting = function() {
		$http.delete('/cleanz/api/' + $routeParams.projectId + '/meetings/' + $routeParams.meetingId).success(function(data) {
			$scope.flash = data.flash;
			$location.path('/project/' + $routeParams.projectId + '/meetings');
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}
});