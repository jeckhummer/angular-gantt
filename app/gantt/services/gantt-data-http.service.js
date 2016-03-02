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
            return HttpService.getResource('gantt-tasks', 1000);
        }

        function getConfig(){
            return HttpService.getResource('gantt-timeline-options', 2000);
        }

        function saveConfig(config){
            console.log('saving gantt timeline config: ', config);
            return HttpService.postResource('gantt-timeline-options', config, 3000);
        }
    }
})();

