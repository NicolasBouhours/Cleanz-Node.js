// ## Create MeetingController
var DocumentController = angular.module('DocumentController', []);

// ## Controller for documents.html
DocumentController.controller('Documents', function($scope, $http, $routeParams) {

	$scope.projectId = $routeParams.projectId;

	$scope.getDocuments = function() {
		$http.get('/cleanz/api/documents/list/' + $routeParams.projectId).success(function(docs) {
			$scope.docs = docs;
		});
	}

	$scope.getDocument = function(doc) {
		$http.get('/cleanz/api/documents/get/' + doc.id).success(function(doc) {
			$scope.flash = 'Le téléchargement de votre fichier va démarré';
		});
	}

	$scope.getDocuments();
});

// ## Controller for addDocument.html
DocumentController.controller('AddDocument', function($scope, $http, $routeParams, $upload) {

	$scope.projectId = $routeParams.projectId;

	//send file to api
    $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: '/cleanz/api/documents/add/' + $routeParams.projectId + '?descr=' + $scope.file.description,
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }
  }

});