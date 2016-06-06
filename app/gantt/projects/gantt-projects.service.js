'use strict';
(function () {
    angular.module('gantt').service('GanttProjectsService', GanttProjectsService);

    function GanttProjectsService(GanttProjectsDataProviderService, GanttOptionsService) {
        var service = this;
        var _projectsDictionary = null;
        var _currentProjectID = GanttOptionsService.getProjectID();
        var _projectName = `Project ID${_currentProjectID}`;

        service.initialized = GanttProjectsDataProviderService.getProjects()
            .then(function(data){
                _projectsDictionary = new Dictionary(data);
                _projectName = _projectsDictionary.get(_currentProjectID)[0].name;
            });

        service.isEmpty = function(){
            return _projectsDictionary.isEmpty();
        };
        service.getProject = function(id){
            return _projectsDictionary.get(id)[0];
        };
        service.getCurrentProjectName = function(){
            return _projectName;
        }
    }
})();