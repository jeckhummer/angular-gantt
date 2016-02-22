'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'gantt',
  'timeline'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/gantt'});
}]);
