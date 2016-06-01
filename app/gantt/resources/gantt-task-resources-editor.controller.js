'use strict';
(function () {
    angular.module('gantt').controller('GanttTaskResourcesController', GanttTaskResourcesController);

    function GanttTaskResourcesController($scope, GanttResourcesService) {
        var ctrl = this;
        ctrl.loading = !GanttResourcesService.ready;

        $scope.$on('task-editor-opened', function(event, taskID){
            ctrl.taskID = taskID;
        });

        $scope.$on('gantt.resources.changed', function () {
            ctrl.loading = false;
        });
    }
})();