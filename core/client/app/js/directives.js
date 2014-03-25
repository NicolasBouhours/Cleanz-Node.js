// ## Create Menu Directive
var MenuDirective = angular.module('MenuDirective', []);

// #### Menu Left Directive
MenuDirective.directive('menuleft', function() {
    return {
      templateUrl: 'app/js/menuleft.html'
    };
});