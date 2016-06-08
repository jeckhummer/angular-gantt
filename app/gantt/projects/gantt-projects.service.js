'use strict';
(function () {
    angular.module('gantt').service('GanttProjectsService', GanttProjectsService);

    function GanttProjectsService(GanttProjectsDataProviderService, GanttOptionsService, $rootScope) {
        var service = this;

        var _projectsData = [];
        var _projectsDictionary = null;
        var _currentProjectID = GanttOptionsService.getProjectID();
        var _projectName = `Project ID${_currentProjectID}`;
        var initialized = GanttProjectsDataProviderService.getProjects()
            .then(function(data){
                _projectsData = data;
                init();
            });

        service.initialized = initialized;
        service.isEmpty = isEmpty;
        service.getProject = getProject;
        service.getCurrentProjectName = getCurrentProjectName;

        init();

        function init(){
            _projectsDictionary = new Dictionary(_projectsData);
            var project = _projectsDictionary.get(_currentProjectID)[0];
            if(project){
                _projectName = project.name;
            }

            $rootScope.$broadcast('projects.data-update');
        }

        function isEmpty(){
            return _projectsDictionary.isEmpty();
        }
        function getProject(id){
            return _projectsDictionary.get(id)[0];
        }
        function getCurrentProjectName(){
            return _projectName;
        }
    }
})();