// ## Create MeetingController
var MeetingController = angular.module('MeetingController', []);

// ## Controller for meetings.html
MeetingController.controller('Meetings', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	// get list of our meetings
	$scope.getMeetings = function() {
		$http.get('/cleanz/api/meetings/list/' + $routeParams.projectId).success(function(meetings) {
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
		$http.post('/cleanz/api/meetings/add', $scope.meeting).success(function(data) {
			$scope.flash = data.flash;
		});
	}

});

// ## Controller for meeting.html
MeetingController.controller('Meeting', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;
	$scope.meetingId = $routeParams.meetingId;

	// get detail for one meeting
	$http.get('/cleanz/api/meetings/' + $routeParams.meetingId).success(function(meeting) {
		$scope.meeting = meeting;
	});
});

// ## Controller for editMeeting.html 
MeetingController.controller('EditMeeting', function($scope, $http, $routeParams, $location,DateService) {

	$scope.projectId = $routeParams.projectId;
	$scope.meetingId = $routeParams.meetingId;

	// get detail for one meeting
	$http.get('/cleanz/api/meetings/' + $routeParams.meetingId).success(function(meeting) {
		$scope.meeting = meeting;

        // format date
		var date = new Date(meeting.dateStart);
        $scope.meeting.dateStart = DateService.format(date);
	});

	// modify meeting into database
	$scope.editMeeting = function() {
		$scope.meeting.projectId = $routeParams.projectId;
		$http.put('/cleanz/api/meetings/' + $routeParams.meetingId, $scope.meeting).success(function(data) {
			$scope.flash = data.flash;
		});
	}

	// remove meeting into database
	$scope.removeMeeting = function() {
		$http.delete('/cleanz/api/meetings/' + $routeParams.meetingId).success(function(data) {
			$scope.flash = data.flash;
			$location.path('/project/' + $routeParams.projectId + 'meetings');
		});
	}
});