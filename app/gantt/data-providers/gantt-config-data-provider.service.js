'use strict';
(function () {
    angular.module('gantt').factory('GanttOptionsDataProviderService', GanttOptionsDataProviderService);

    function GanttOptionsDataProviderService(GanttHttpService) {
        var service = {
            getTimelineConfig: getTimelineConfig,
            saveTimelineConfig: saveTimelineConfig
        };
        
        _init();
        return service;
        
        function _init(){
            
        }

        function getTimelineConfig(){
            return GanttHttpService.sendRequest('GetTimelineOptions');
        }

        function saveTimelineConfig(config){
            var data = {
                json: JSON.stringify(config)
            };

            return GanttHttpService.sendRequest('SaveTimelineOptions', data);
        }
    }
})();