'use strict';
(function () {
    angular.module('gantt').factory('GanttDataProviderService', GanttDataProviderService);

    function GanttDataProviderService(HttpService) {
        var service = {
            getTasks: getTasks,
            getConfig: getConfig,
            saveConfig: saveConfig,
            saveTask: saveTask,
            getBaselines: getBaselines
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

        function getBaselines(){
            var baselines = HttpService.getResource('gantt-baselines', 0);
            return baselines;
        }
    }
})();

