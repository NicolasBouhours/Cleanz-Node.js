// ## Create ProjectController
var ProjectController = angular.module('ProjectController', []);

// ## Controller for project.html
 ProjectController.controller('ProjectsList', function($scope, $http, $location) {

    $scope.showAddTask = false;

    // List of all project of one user
    $scope.getProjects = function() {
            $http.get('/cleanz/api/projects/list').success(function(data) {
            $scope.projects = data;
        });
    }

    // List of our invitation
   $scope.getInvitations = function() {
        $http.get('cleanz/api/invits/list').success(function(data) {
            $scope.invits = data.invits;
        });
    } 
    
    // Project to Database
    $scope.addProject = function() {
        $http.post('/cleanz/api/projects/add', $scope.project).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
            $scope.showAddTask = false;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }

    // Accept invitation
    $scope.acceptInvit = function(invit) {
        $http.put('cleanz/api/invits/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getProjects();
            $scope.getInvitations();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }
    
    // Refuse invitation
    $scope.refuseInvit = function(invit) {
        $http.delete('cleanz/api/invits/' + invit.id).success(function(data) {
            $scope.flash = data.flash;
            $scope.getInvitations();
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }

    // Show addTask form
    $scope.addTaskShow = function() {
        $scope.showAddTask = true;
    }

    // Hide addTask form
    $scope.addTaskHide = function() {
        $scope.showAddTask = false;
    }

    $scope.getInvitations();
    $scope.getProjects();
});

// ## Controller for projectBoard.html
 ProjectController.controller('ProjectBoard', function($scope, $http, $location, $routeParams) {

    $scope.projectId = $routeParams.projectId;

    // Send invitation for one user
    $scope.addProjectUser = function() {
      $scope.userAdd.projectId = $routeParams.projectId;
        $http.post('cleanz/api/invits/add', $scope.userAdd).success(function(data) {
            $scope.flash = data.flash;
        }).error(function(data) {
            $scope.flash = data.flash;
        });
    }
 });

 //## Controller for params.html
 ProjectController.controller('Params', function($scope, $http, $routeParams, $location) {

    $scope.projectId = $routeParams.projectId;
    $scope.showAddCat = false;
    $scope.showDeletePro = false;
    $scope.showModifyCat = false;
    $scope.showDeleteCat = false;

    //get all categories
    $scope.getCategories = function() {
        $http.get('cleanz/api/' + $routeParams.projectId + '/categories/list').success(function(categories) {
            $scope.categories = categories;
        });
    }

    //add category into database
    $scope.addCategory = function() {
        $scope.category.projectId = $routeParams.projectId;
        $http.post('cleanz/api/' + $routeParams.projectId + '/categories/create', $scope.category).success(function(data) {
            $scope.flash = data.flash;
            $scope.getCategories();
            $scope.showAddCat = false;
        });
    }

    // delete project
    $scope.deleteProject = function() {
        $http.delete('/cleanz/api/projects/' + $routeParams.projectId).success(function(data) {
            $scope.flash = data.flash;
        });
    }

    // modify category
    $scope.modifyCategory = function(id) {
        $http.put('cleanz/api/' + $routeParams.projectId + '/categories/' + $scope.catId, $scope.catM).success(function(data) {
            $scope.flash = data.flash;
            $scope.getCategories();
            $scope.showModifyCat = false;
        });
    }

    //delete category
    $scope.deleteCategory = function(id) {
        $http.delete('cleanz/api/' + $routeParams.projectId + '/categories/' + $scope.catId).success(function(data) {
            $scope.flash = data.flash;
            $scope.getCategories();
            $scope.showDeleteCat = false;
        });
    }

    // Show addCategory form
    $scope.addCategoryShow = function() {
        $scope.showAddCat = true;
    }

    // Hide addCategory form
    $scope.addCategoryHide = function() {
        $scope.showAddCat = false;
    }

    // Show modifyCategory form
    $scope.modifyCategoryShow = function() {
        $scope.showModifyCat = true;
    }

    // Hide modifyCategory form
    $scope.modifyCategoryHide = function() {
        $scope.showModifyCat = false;
    }

    // Show deleteCategory form
    $scope.deleteCategoryShow = function() {
        $scope.showDeleteCat = true;
    }

    // Hide deleteCategory form
    $scope.deleteCategoryHide = function() {
        $scope.showDeleteCat = false;
    }

    // Show deleteProject form
    $scope.deleteProjectShow = function() {
        $scope.showDeletePro = true;
    }

    // Hide deleteProject form
    $scope.deleteProjectHide = function() {
        $scope.showDeletePro = false;
    }

    $scope.getCategories();
});

// ## Controller for project.html
 ProjectController.controller('GetCategories', function($scope, $http, $routeParams) {

    //get all categories
    $scope.getCategories = function() {
        $http.get('cleanz/api/' + $routeParams.projectId + '/categories/list').success(function(categories) {
            $scope.categories = categories;
        });
    }

    $scope.getCategories();
});

 // ## Controller for usersList - Task, meeting and bug Forms
 ProjectController.controller('GetListUsers', function($scope, $http, $routeParams) {

    $scope.usersadd = [];

    // Get list of all users for one project
    $scope.getListUsers = function() {
        $http.get('cleanz/api/projects/listUsers/' + $routeParams.projectId).success(function(data) {
            $scope.listUsers = data.users;
        });
    }

    $scope.addUser = function(user) {
        $scope.usersadd.push(user);
    }

    $scope.deleteUser = function() {
        $scope.usersadd = [];
    }

    $scope.getListUsers();
 });