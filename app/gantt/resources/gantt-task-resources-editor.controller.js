'use strict';
(function () {
    angular.module('gantt').controller('GanttTaskResourcesController', GanttTaskResourcesController);

    function GanttTaskResourcesController($scope, GanttResourcesService) {
        var ctrl = this;
        ctrl.state = GanttResourcesService.state;
        ctrl.retry = GanttResourcesService.retry;

        $scope.$on('task-editor-opened', function(event, taskID){
            ctrl.taskID = taskID;
        });

        $scope.$on('gantt.resources.state-changed', function (event, state) {
            ctrl.state = state;
        });
    }
})();