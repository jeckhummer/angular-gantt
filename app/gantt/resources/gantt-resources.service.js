'use strict';
(function () {
    angular.module('gantt').factory('GanttResourcesService', GanttResourcesService);

    function GanttResourcesService($rootScope, GanttResourcesDataProviderService) {
        var stateNotifier = new StateManager('gantt.resources', (state) => $rootScope.$broadcast(state));

        var IDToResourceDictionary = null;
        var ProjectToResourceDictionary = null;
        
        var service = {
            getAssignedToProjectResources: getAssignedToProjectResources,
            getResource: getResource,
            reload: reload,
            getState: stateNotifier.getState
        };

        _init();
        return service;

        function reload() {
            stateNotifier.setState('load.start');

            var promise = GanttResourcesDataProviderService.getResources();
            promise.then(
                function (resourcesData) {
                    IDToResourceDictionary = new Dictionary(resourcesData);
                    ProjectToResourceDictionary = new Dictionary(resourcesData,
                        (resource) => resource.assignedToProjects,
                        (resource) => resource.id
                    );
                    ProjectToResourceDictionary.chainTo(IDToResourceDictionary);

                    stateNotifier.setState('loaded.success.2.3.4.5');
                },
                function (error) {
                    stateNotifier.setState('loaded.error');
                }
            ).finally(function () {
                stateNotifier.setState('load.end');
            });

            return promise;
        }

        function _init() {
            stateNotifier.setState('init.start');

            var promise = reload();
            promise.finally(function () {
                stateNotifier.setState('init.end');
            });
        }

        function getAssignedToProjectResources(projectID){
            GanttResourcesDictionaryService.processRange(function (resource) {
                // var project
                // return
            });
        }

        function getResource(id) {
            var resource = IDToResourceDictionary.get(id);
            return resource;
        }
    }
})();