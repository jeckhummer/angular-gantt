'use strict';
(function () {
    angular.module('gantt').factory('GanttConfigDataProviderService', GanttConfigDataProviderService);

    function GanttConfigDataProviderService() {
        var service = {
            getTimelineConfig: getTimelineConfig,
            saveTimelineConfig: saveTimelineConfig
        };
        
        _init();
        return service;
        
        function _init(){
            
        }

        function getTimelineConfig(){

        }

        function saveTimelineConfig(){

        }
    }
})();