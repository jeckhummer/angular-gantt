'use strict';
(function () {
    angular.module('gantt').controller('GanttTaskResourcesController', GanttTaskResourcesController);

    function GanttTaskResourcesController($scope, GanttResourcesService, $timeout) {
        var ctrl = this;

        ctrl.selectedResource = null;
        ctrl.hoursEmployed = 0;
        ctrl.resources = [];
        ctrl.getAvailableResources = getAvailableResources;
        ctrl.getTaskResources = getTaskResources;
        ctrl.assignResourceToTask = assignResourceToTask;
        ctrl.unassignResourceFromTask = unassignResourceFromTask;

        init();

        function init(){
            $scope.$on('task-editor-opened', function(event, taskID){
                ctrl.taskID = taskID;
            });
            _changeState('loading', GanttResourcesService.initialized);
        }

        function getAvailableResources(){
            return GanttResourcesService.getAvailableForTaskResources(ctrl.taskID);
        }

        function assignResourceToTask() {
            ctrl.state = 'assigning';
            _changeState('assigning', GanttResourcesService.assignResourceToTask(ctrl.selectedResource.id, ctrl.taskID))
            ctrl.selectedResource = null;
        }

        function unassignResourceFromTask(resourceID) {
            ctrl.state = 'unassigning';
            _changeState('unassigning', GanttResourcesService.unassignResourceFromTask(resourceID, ctrl.taskID))
        }

        function getTaskResources() {
            return GanttResourcesService.getTaskResources(ctrl.taskID);
        }

        function _changeState(state, promise) {
            ctrl.state = state;
            promise.then(
                function () {
                    ctrl.state = 'ready';
                },
                function(){
                    ctrl.state = 'error';
                }
            );
        }
    }
})();