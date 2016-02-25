'use strict';
(function () {
    angular.module('gantt').factory('GanttDataHTTPService', GanttDataHTTPService);

    function GanttDataHTTPService(HttpService) {
        var service = {
            getTasks: getTasks,
            getConfig: getConfig,
            saveConfig: saveConfig,
        };
        return service;

        function getTasks(){
            return HttpService.getResource('gantt-tasks', 3000);
        }

        function getConfig(){
            return HttpService.getResource('gantt-timeline-options', 6000);
        }

        function saveConfig(config){
            return HttpService.postResource('gantt-timeline-options', config);
        }
    }
})();

