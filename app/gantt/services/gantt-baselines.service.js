(function () {
    angular.module('gantt').factory('GanttBaselinesService', GanttBaselinesService);

    function GanttBaselinesService(GanttDataHTTPService, $rootScope, DateService) {
        var service = {};

        init();
        return service;

        function init(){}
    }
})();