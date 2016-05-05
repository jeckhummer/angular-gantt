'use strict';

(function () {
    angular.module('gantt').component('ganttResourcesList', {
        templateUrl: 'gantt/resources/gantt-resources-list.component.html',
        controller: GanttResourcesListController
    });

    function GanttResourcesListController($scope, GanttResourcesService, GanttOptionsService){
        var ctrl = this;
        _init();

        function _init(){
            ctrl.state = GanttResourcesService.getState();
            $scope.$on('gantt.resources.$state-change', _onStateChange);
        }

        function _onStateChange() {
            ctrl.state = GanttResourcesService.getState();

            switch(ctrl.state){
                case 'loaded.success': _populateResources(); break;
            }
        }

        function _populateResources() {
            var resources = GanttResourcesService.getAll();
            var currentProjectName = GanttOptionsService.getProjectName();

            resources.map(function (resource) {
                resource.isAssignedToThisProject = resource.projects.indexOf(currentProjectName) > -1;
            });
            ctrl.resources = resources;
        }
    }
}());