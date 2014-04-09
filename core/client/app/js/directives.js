// ## Create Menu Directive
var MenuDirective = angular.module('MenuDirective', []);

// #### Menu Left Directive
MenuDirective.directive('menuleft', function() {
    return {
      templateUrl: 'app/htmldirectives/menuleft.html'
    };
});

// #### Select List Categories
MenuDirective.directive('selectcategories', function() {
	return {
		templateUrl: 'app/htmldirectives/selectcategories.html',
		controller: 'GetCategories'
	}
});