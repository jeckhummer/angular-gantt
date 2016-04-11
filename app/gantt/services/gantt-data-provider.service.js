'use strict';
(function () {
    angular.module('gantt').factory('GanttDataProviderService', GanttDataProviderService);

    function GanttDataProviderService(HttpService) {
        var service = {
            getConfig: getConfig,
            saveConfig: saveConfig,
            getBaselines: getBaselines
        };
        return service;

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

