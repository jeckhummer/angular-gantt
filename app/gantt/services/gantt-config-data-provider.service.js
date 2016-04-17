'use strict';
(function () {
    angular.module('gantt').factory('GanttConfigDataProviderService', GanttConfigDataProviderService);

    function GanttConfigDataProviderService() {
        var service = {
            getTimelineConfig: getTimelineConfig
        };
        
        _init();
        return service;
        
        function _init(){
            
        }

        function getTimelineConfig(){

        }
    }
})();