'use strict';
(function () {
    angular.module('gantt').controller('GanttTaskResourcesController', GanttTaskResourcesController);

    function GanttTaskResourcesController($scope, GanttResourcesService) {
        var ctrl = this;

        ctrl.selectedResource = null;
        ctrl.hoursEmployed = 0;
        ctrl.resources = [];
        ctrl.loaded = false;
        ctrl.getAvailableResources = getAvailableResources;
        ctrl.getTaskResources = getTaskResources;
        ctrl.assignResourceToTask = assignResourceToTask;
        ctrl.unassignResourceFromTask = unassignResourceFromTask;

        init();

        function init(){
            $scope.$on('task-editor-opened', function(event, taskID){
                ctrl.taskID = taskID;
            });
            _changeState('Loading resources', GanttResourcesService.initialized.then(() => ctrl.loaded = true));
        }

        function getAvailableResources(){
            return GanttResourcesService.getAvailableForTaskResources(ctrl.taskID);
        }

        function assignResourceToTask() {
            _changeState(
                'Assigning resource',
                GanttResourcesService.assignResourceToTask(ctrl.selectedResource.id, ctrl.taskID)
            );
            ctrl.selectedResource = null;
        }

        function unassignResourceFromTask(resourceID) {
            _changeState(
                'Unassigning resource',
                GanttResourcesService.unassignResourceFromTask(resourceID, ctrl.taskID)
            );
        }

        function getTaskResources() {
            return GanttResourcesService.getTaskResources(ctrl.taskID);
        }

        function _changeState(notification, promise) {
            ctrl.notification = notification;
            ctrl.state = 'loading';
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