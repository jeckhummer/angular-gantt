'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'view2',
  'gantt',
  'version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/gantt'});
}]);
