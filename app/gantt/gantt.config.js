angular.module('gantt', ['ngRoute', 'timeline', 'ngSanitize']);

(function () {
    angular.module('gantt').config(GanttRouteConfig);

    function GanttRouteConfig($routeProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html'
        });
    }
})();



