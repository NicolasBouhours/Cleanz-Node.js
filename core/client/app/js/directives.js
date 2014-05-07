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

MenuDirective.directive('selectusers', function() {
	return {
		templateUrl: 'app/htmldirectives/selectusers.html',
		controller: 'GetListUsers'
	}
});