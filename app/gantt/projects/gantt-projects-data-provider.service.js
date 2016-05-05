'use strict';
(function () {
    angular.module('gantt').factory('GanttProjectsDataProviderService', GanttProjectsDataProviderService);

    function GanttProjectsDataProviderService() {
        var service = {
            getProjects: getProjects
        };

        _init();
        return service;

        function _init(){

        }

        function getProjects() {
        }
    }
})();