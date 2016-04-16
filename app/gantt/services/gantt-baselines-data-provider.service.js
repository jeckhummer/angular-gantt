'use strict';
(function () {
    angular.module('gantt').factory('GanttBaselinesDataProviderService', GanttBaselinesDataProviderService);

    function GanttBaselinesDataProviderService(HttpService) {
        var service = {
            getBaselines: getBaselines
        };
        
        _init();
        return service;
        
        function _init(){
            
        }

        function getBaselines(){
            var baselines = HttpService.getResource('gantt-baselines', 0);
            return baselines;
        }
    }
})();