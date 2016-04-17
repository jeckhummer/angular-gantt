'use strict';
(function () {
    angular.module('gantt').factory('GanttDataProviderService', GanttDataProviderService);

    function GanttDataProviderService(GanttHttpService) {
        var service = {
            getConfig: getConfig,
            saveConfig: saveConfig,
            getBaselines: getBaselines
        };
        return service;

        function getConfig(){
            return GanttHttpService.sendRequest('GetTimelineOptions');
        }

        function saveConfig(config){
            console.log('saving gantt timeline config: ', config);
            return GanttHttpService.sendRequest('gantt-timeline-options', config);
        }

        function getBaselines(){
            var baselines = GanttHttpService.sendRequest('GetBaselines');
            return baselines;
        }
    }
})();

