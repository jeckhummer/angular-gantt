angular.module('gantt', ['ngRoute', 'timeline', 'ngSanitize', 'frapontillo.bootstrap-switch', 'common']);

(function () {
    angular.module('gantt').config(GanttRouteConfig);

    function GanttRouteConfig($routeProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html'
        });
    }
})();



