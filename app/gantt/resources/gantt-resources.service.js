'use strict';
(function () {
    angular.module('gantt').service('GanttResourcesService', GanttResourcesService);

    function GanttResourcesService($rootScope, GanttProjectsService, GanttResourcesDataProviderService) {
        var service = this;
        var _IDToResourceDictionary = null;
        var _ProjectIDToResourceDictionary = null;
        service.ready = false;

        GanttResourcesDataProviderService.getResources()
            .then(function(data){
                _IDToResourceDictionary = new Dictionary(data);
                _ProjectIDToResourceDictionary = new Dictionary(data,
                    (resource) => resource.assignedToProjects
                );

                // если данные по проектам готовы, то используем их.
                if (GanttProjectsService.ready) {
                    onProjectsChanged(data);
                }

                // подписываемся на изменение данных.
                // делать это можно только после того, как данные по ресурсам будут получены.
                $rootScope.$on('gantt.projects.changed', function () {
                    onProjectsChanged(data);
                });
            });

        service.getResource = function (id) {
            return _IDToResourceDictionary.get(id)[0];
        };
        service.getProjectResources = projectID => _ProjectIDToResourceDictionary.get(projectID);

        function onProjectsChanged(data) {
            data.forEach(function (resource) {
                resource.projects = resource.assignedToProjects.map(
                    projectID => GanttProjectsService.getProject(projectID)
                );
            });
            service.ready = true;
            $rootScope.$broadcast('gantt.resources.changed');
        }

        // function onTasksChanged(data) {
        //     _TaskIDToResourceDictionary = new Dictionary(
        //         GanttTasksService.getAll(),
        //         task => task.id,
        //         task => task.resourcesAssigned
        //     );
        //     _TaskIDToResourceDictionary.chainTo(_IDToResourceDictionary);
        // }
    }
})();