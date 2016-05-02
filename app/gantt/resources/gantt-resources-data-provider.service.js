'use strict';
(function () {
    angular.module('gantt').factory('GanttResourcesDataProviderService', GanttResourcesDataProviderService);

    function GanttResourcesDataProviderService() {
        var service = {
            getResources: getResources
        };

        _init();
        return service;

        function _init(){

        }

        function getResources() {
        }
    }
})();