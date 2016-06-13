'use strict';

(function () {
    angular.module('gantt').component('ganttResourcesList', {
        templateUrl: 'jsWidgets/angular-gantt/app/gantt/resources/gantt-resources-list.component.html',
        controller: GanttResourcesListController,
        bindings: {
            onUnassign: '&',
            resources: '<',
            taskId: '@'
        }
    });
    function GanttResourcesListController(){
        this.tracker = function (resource) {
            return resource.resource.id + " " + resource.hours;
        };
    }
}());