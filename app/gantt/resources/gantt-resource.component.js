'use strict';

(function () {
    angular.module('gantt').component('ganttResource', {
        templateUrl: 'gantt/resources/gantt-resource.component.html',
        controller: GanttResourceController,
        bindings: {
            id: '@'
        }
    });

    function GanttResourceController(GanttResourcesService){
        var ctrl = this;

        ctrl.init = init;

        function init() {
            var data = GanttResourcesService.getResource(ctrl.id);

            ctrl.name = data.name;
            ctrl.projects = data.projects;
            ctrl.employmentHours = data.employmentHours;
            ctrl.employmentPercentage = data.employmentPercentage;
            ctrl.isAssignedToThisProject = data.isAssignedToThisProject;

            ctrl.projectsString = ctrl.projects.join(', ');
            ctrl.projectsList = ctrl.projects.join('<br />');
        }
    }
}());