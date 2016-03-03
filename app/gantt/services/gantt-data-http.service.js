'use strict';
(function () {
    angular.module('gantt').factory('GanttDataHTTPService', GanttDataHTTPService);

    function GanttDataHTTPService(HttpService) {
        var service = {
            getTasks: getTasks,
            getConfig: getConfig,
            saveConfig: saveConfig,
            saveTask: saveTask
        };
        return service;

        function getTasks(){
            return HttpService.getResource('gantt-tasks', 0);
        }

        function saveTask(task){
            console.log('saving gantt task: ', task);
            return HttpService.postResource('gantt-task', task, 0);
        }

        function getConfig(){
            return HttpService.getResource('gantt-timeline-options', 0);
        }

        function saveConfig(config){
            console.log('saving gantt timeline config: ', config);
            return HttpService.postResource('gantt-timeline-options', config, 0);
        }
    }
})();

