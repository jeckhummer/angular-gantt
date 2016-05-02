'use strict';
(function () {
    angular.module('gantt').factory('GanttResourcesService', GanttResourcesService);

    function GanttResourcesService($rootScope, GanttResourcesDataProviderService) {
        var resources = [];

        var service = {
            getAll: getAll
        };

        _init();
        return service;

        function _init() {
            var promise = GanttResourcesDataProviderService.getResources();

            promise.then(function (data) {
                resources = data.resources;
                $rootScope.$broadcast('gantt.task.resources.changed');
            });
        }

        function getAll(){
            return resources;
        }
    }
})();