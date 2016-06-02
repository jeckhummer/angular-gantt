'use strict';
(function () {
    angular.module('gantt').controller('GanttTaskResourcesController', GanttTaskResourcesController);

    function GanttTaskResourcesController($scope, GanttResourcesService) {
        var ctrl = this;
        ctrl.state = GanttResourcesService.state;
        ctrl.retry = GanttResourcesService.retry;
        ctrl.selectedResource = null;
        ctrl.resources = [];
        ctrl.assignResourceToTask = assignResourceToTask;

        _initResources();

        $scope.$on('task-editor-opened', function(event, taskID){
            ctrl.taskID = taskID;
            _initResources();
        });

        $scope.$on('gantt.resources.state-changed', function (event, state) {
            ctrl.state = state;
            _initResources();
        });

        function _initResources(){
            if(GanttResourcesService.state == 'ready' && ctrl.taskID){
                ctrl.resources = GanttResourcesService.getAvailableForTaskResources(ctrl.taskID);
            }
        }

        function assignResourceToTask() {
            GanttResourcesService.assignResourceToTask(ctrl.selectedResource.id, ctrl.taskID);
            ctrl.selectedResource = null;
        }
    }
})();