'use strict';
(function () {
    angular.module('gantt').factory('GanttBaselinesDataProviderService', GanttBaselinesDataProviderService);

    function GanttBaselinesDataProviderService(GanttHttpService) {
        var service = {
            getBaselines: getBaselines
        };
        
        _init();
        return service;
        
        function _init(){
            
        }

        function getBaselines(){
            var baselines = GanttHttpService.sendRequest('GetBaselines');
            return baselines;
        }
    }
})();