// ## Create MeetingController
var DocumentController = angular.module('DocumentController', []);

// ## Controller for documents.html
DocumentController.controller('Documents', function($scope, $http, $routeParams, FileService) {

	$scope.projectId = $routeParams.projectId;
	$scope.showDocForm = false;

	$scope.getDocuments = function() {
		$http.get('/cleanz/api/' + $routeParams.projectId + '/documents/list').success(function(docs) {
			for(var i = 0; i < docs.length; i++) {
				docs[i].ext = FileService.getExtention(docs[i].name);
			}
			$scope.docs = docs;
		});
	}

	$scope.showForm = function() {
		$scope.showDocForm = true;
	}

	$scope.closeModif = function() {
		$scope.showDocForm = false;
	}
	$scope.getDocument = function(doc) {
		$http.get('/cleanz/api/' + $routeParams.projectId + '/documents/get/' + doc.id).success(function(doc) {
			$scope.flash = 'Le téléchargement de votre fichier va démarré';
		}); 
	}

	$scope.getDoc = function(doc) {
		$http.get('/cleanz/api/' + $routeParams.projectId + '/documents/' + doc.id).success(function(doc) {
			$scope.doc = doc;
		});
	}

	$scope.editDoc = function(doc) {
		$http.put('/cleanz/api/' + $routeParams.projectId + '/documents/' + $scope.doc.id, $scope.doc).success(function(data) {
			$scope.flash = data.flash;
			$scope.getDocuments();
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}

	$scope.deleteDoc = function(doc) {
		$http.delete('/cleanz/api/' + $routeParams.projectId + '/documents/' + $scope.doc.id).success(function(data) {
			$scope.flash = data.flash;
		}).error(function(data) {
            $scope.flash = data.flash;
        });
	}

	$scope.getDocuments();
});

// ## Controller for addDocument.html
DocumentController.controller('AddDocument', function($scope, $http, $routeParams, $upload) {

	$scope.projectId = $routeParams.projectId;

	var fileUpload;

	 $scope.onFileSelec = function($files) {
		fileUpload = $files;
	 }

	//send file to api
    $scope.onFileSelect = function() {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < fileUpload.length; i++) {
      var $file = fileUpload[i];
      $upload.upload({
        url: '/cleanz/api/' + $routeParams.projectId + '/documents/add/' + $routeParams.projectId + '?descr=' + $scope.file.description,
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }
  }

});