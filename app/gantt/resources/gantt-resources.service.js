'use strict';
(function () {
    angular.module('gantt').service('GanttResourcesService', GanttResourcesService);

    function GanttResourcesService($rootScope, GanttProjectsService, GanttResourcesDataProviderService, GanttOptionsService) {
        var service = this;
        var _IDToResourceDictionary = null;
        var _ProjectToResourceDictionary = null;
        var _TaskToResourceDictionary = null;
        var _dataError = false;

        service.getResource = getResource;
        service.getResources = getResources;
        service.getAvailableForTaskResources = getAvailableForTaskResources;
        service.getProjectResources = getProjectResources;
        service.getTaskResources = getTaskResources;
        service.reload = reload;
        service.retry = retry;
        service.assignResourceToTask = assignResourceToTask;
        service.unassignResourceFromTask = unassignResourceFromTask;

        service.reload();

        function getResource(id) {
            return _IDToResourceDictionary.get(id)[0];
        }
        function getResources() {
            return _IDToResourceDictionary.getValues();
        }
        function getAvailableForTaskResources(taskID) {
            return getResources().filter(function(resource){
                return resource.assignedToTasks.indexOf(taskID) === -1;
            });
        }
        function getProjectResources(projectID) {
            return _ProjectToResourceDictionary.get(projectID);
        }
        function getTaskResources(taskID) {
            return _TaskToResourceDictionary.get(taskID);
        }
        function reload() {
            _setState('loading');
            GanttResourcesDataProviderService.getResources().then(
                function (data) {
                    _IDToResourceDictionary = new Dictionary(data);

                    _ProjectToResourceDictionary = new Dictionary(
                        _IDToResourceDictionary.getValues(),
                        (resource) => resource.assignedToProjects
                    );

                    _TaskToResourceDictionary = new Dictionary(
                        _IDToResourceDictionary.getValues(),
                        (resource) => resource.assignedToTasks
                    );

                    // если данные по проектам готовы, то используем их.
                    if (GanttProjectsService.state === 'ready') {
                        _setState('ready');
                        _onProjectsChanged(data);
                    }

                    // подписываемся на изменение данных.
                    // делать это можно только после того, как данные по ресурсам будут получены.
                    $rootScope.$on('gantt.projects.state-changed', function (event, state) {
                        _setState(state);
                        if (state == 'ready') {
                            _onProjectsChanged(data);
                        }
                    });
                },
                function () {
                    _setState('error');
                    _dataError = true;
                }
            );
        }
        function retry() {
            if (GanttProjectsService.state == 'error') {
                _setState('loading');
                GanttProjectsService.reload();
            }
            if (_dataError) {
                service.reload();
            }
        }
        function assignResourceToTask(resourceID, taskID) {
            _setState('loading');
            GanttResourcesDataProviderService.assignResourceToTask(resourceID, taskID)
                .then(function(){
                    reload();
                }, function(){
                    _setState('error');
                });
        }
        function unassignResourceFromTask(taskID, resourceID){
            
        }

        function _onProjectsChanged(data) {
            data.forEach(function (resource) {
                resource.projects = resource.assignedToProjects.map(
                    projectID => GanttProjectsService.getProject(projectID)
                );
            });
        }

        function _setState(state) {
            service.state = state;
            $rootScope.$broadcast('gantt.resources.state-changed', state);
        }
    }
})();