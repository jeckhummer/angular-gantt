'use strict';
(function () {
    angular.module('gantt').service('GanttResourcesService', GanttResourcesService);

    function GanttResourcesService($rootScope, GanttProjectsService, GanttResourcesDataProviderService) {
        var service = this;
        var _IDToResourceDictionary = null;
        var _ProjectIDToResourceDictionary = null;
        var _dataError = false;

        service.getResource = function (id) {
            return _IDToResourceDictionary.get(id)[0];
        };
        service.getProjectResources = projectID => _ProjectIDToResourceDictionary.get(projectID);
        service.reload = function reload(){
            _setState('loading');
            GanttResourcesDataProviderService.getResources().then(
                function(data){
                    _IDToResourceDictionary = new Dictionary(data);
                    _ProjectIDToResourceDictionary = new Dictionary(data,
                        (resource) => resource.assignedToProjects
                    );

                    // если данные по проектам готовы, то используем их.
                    if (GanttProjectsService.state === 'ready') {
                        _onProjectsChanged(data);
                    }

                    // подписываемся на изменение данных.
                    // делать это можно только после того, как данные по ресурсам будут получены.
                    $rootScope.$on('gantt.projects.state-changed', function (event, state) {
                        _setState(state);
                        if(state == 'ready'){
                            _onProjectsChanged(data);
                        }
                    });
                },
                function () {
                    _setState('error');
                    _dataError = true;
                }
            );
        };
        service.retry = function retry(){
            if(GanttProjectsService.state == 'error'){
                _setState('loading');
                GanttProjectsService.reload();
            }
            if(_dataError){
                service.reload();
            }
        };

        service.reload();

        function _onProjectsChanged(data) {
            data.forEach(function (resource) {
                resource.projects = resource.assignedToProjects.map(
                    projectID => GanttProjectsService.getProject(projectID)
                );
            });
        }

        function _setState(state){
            service.state = state;
            $rootScope.$broadcast('gantt.resources.state-changed', state);
        }
    }
})();