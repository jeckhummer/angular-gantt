angular.module('app-dev', ['app', 'ngMockE2E', 'test']);
//angular.module('app-dev', ['app', 'ngMockE2E', 'test', 'devRootScope']);

(function () {
    angular.module('app-dev').config(AppRouterConfig);

    function AppRouterConfig($routeProvider) {
        $routeProvider.when('/test',{
            templateUrl: "../app/test/test.html",
            controller: "testController as ctrl"
        });
    }
}());


