'use strict';
(function () {
    angular.module('gantt').factory('GanttProjectsService', GanttProjectsService);

    function GanttProjectsService(GanttProjectsDictionaryService, GanttProjectsDataProviderService, $rootScope) {
        var service = {
            ready: false,
            isEmpty: GanttProjectsDictionaryService.isEmpty,
            getProject: GanttProjectsDictionaryService.get,
            getProjects: GanttProjectsDictionaryService.getRange
        };
        
        _init();
        return service;
        
        function _init(){
            var promise = GanttProjectsDataProviderService.getProjects();

            promise.then(function (data) {
                GanttProjectsDictionaryService.reset();
                GanttProjectsDictionaryService.addRange(data.projects);

                $rootScope.$broadcast('gantt.projects.changed');
                service.ready = true;
            });
        }
    }
})();