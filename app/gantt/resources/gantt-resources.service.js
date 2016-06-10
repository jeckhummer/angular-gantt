'use strict';
(function () {
    angular.module('gantt').service('GanttResourcesService', GanttResourcesService);

    function GanttResourcesService($rootScope, GanttOptionsService, GanttResourcesDataProviderService) {
        var service = this;

        var _resourcesData = [];
        var _resourcesDataPromise = GanttResourcesDataProviderService.getResources();
        var initialized = _resourcesDataPromise
            .then(function (data) {
                _resourcesData = data;
                init();
            });

        var _IDToResourceDictionary = null;
        var _ProjectToResourceDictionary = null;
        var _TaskToResourceDictionary = null;

        service.initialized = initialized;
        service.getResource = getResource;
        service.getResources = getResources;
        service.getAvailableForTaskResources = getAvailableForTaskResources;
        service.getProjectResources = getProjectResources;
        service.isResourceAssignedToTask = isResourceAssignedToTask;
        service.getTaskResources = getTaskResources;
        service.assignResourceToTask = assignResourceToTask;
        service.unassignResourceFromTask = unassignResourceFromTask;

        init();

        function init() {
            _IDToResourceDictionary = new Dictionary(_resourcesData);

            _ProjectToResourceDictionary = new Dictionary(
                _IDToResourceDictionary.getValues(),
                function (resource) {
                    return resource.assignedToProjects;
                }
            );

            _TaskToResourceDictionary = new Dictionary(
                _IDToResourceDictionary.getValues(),
                function (resource) {
                    return resource.assignedToTasks.map(function (task) {
                        return task.id;
                    });
                },
                function (resource, taskID) {
                    return {
                        resource: resource,
                        hours: resource.assignedToTasks.filter(function (task) {
                            return task.id == taskID;
                        })[0].hours
                    }
                }
            );

            $rootScope.$broadcast('resources.data-update');
        }

        function getResource(id) {
            return _IDToResourceDictionary.get(id)[0];
        }

        function getResources() {
            return _IDToResourceDictionary.getValues();
        }

        function getAvailableForTaskResources(taskID) {
            return getResources().filter(function (resource) {
                return resource.assignedToTasks
                        .map(function (task) {
                            return task.id;
                        })
                        .indexOf(taskID) === -1;
            });
        }

        function getProjectResources(projectID) {
            return _ProjectToResourceDictionary.get(projectID);
        }

        function getTaskResources(taskID) {
            return _TaskToResourceDictionary.get(taskID);
        }

        function assignResourceToTask(resourceID, taskID, hoursEmployed) {
            return GanttResourcesDataProviderService.assignResourceToTask(resourceID, taskID, hoursEmployed)
                .then(function () {
                    var resource = _IDToResourceDictionary.get(resourceID)[0];
                    resource.assignedToTasks.push({id: taskID, hours: hoursEmployed});
                    resource.assignedToProjects.push(GanttOptionsService.getProjectID());
                    init(_IDToResourceDictionary.getValues());
                    $rootScope.$broadcast('data-update', resourceID, taskID);
                });
        }

        function unassignResourceFromTask(resourceID, taskID) {
            return GanttResourcesDataProviderService.unassignResourceFromTask(resourceID, taskID)
                .then(function () {
                    var resource = _IDToResourceDictionary.get(resourceID)[0];
                    var index = resource.assignedToTasks
                        .map(function (task) {
                            return task.id;
                        })
                        .indexOf(parseInt(taskID));
                    if (index > -1) {
                        resource.assignedToTasks.splice(index, 1);
                    }
                    init(_IDToResourceDictionary.getValues());
                    $rootScope.$broadcast('resources.data-update', resourceID, taskID);
                });
        }

        function isResourceAssignedToTask(resourceID, taskID) {
            return getTaskResources(taskID)
                .map(function (data) {
                    return data.resource.id;
                }).indexOf(parseInt(resourceID)) > -1;
        }
    }
})();