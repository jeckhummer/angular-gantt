angular.module('app-dev', ['app', 'ngMockE2E', 'test']);

(function () {
    angular.module('app-dev').config(AppRouterConfig);

    function AppRouterConfig($routeProvider) {
        $routeProvider.when('/test',{
            templateUrl: "../test/test.html",
            controller: "testController as ctrl"
        });
    }
}());


