'use strict';
(function () {
    angular.module('gantt').controller('GanttTaskResourcesController', GanttTaskResourcesController);

    function GanttTaskResourcesController($scope, GanttResourcesService) {
        var ctrl = this;

        ctrl.selectedResource = null;
        ctrl.assignedResources = [];
        ctrl.availableResources = [];
        ctrl.hoursEmployed = 1;
        ctrl.loaded = false;
        ctrl.invalidHours = false;
        ctrl.assignResourceToTask = assignResourceToTask;
        ctrl.unassignResourceFromTask = unassignResourceFromTask;

        init();
        connect();

        function connect(){
            $scope.$on('task-editor-opened', function(event, taskID){
                ctrl.taskID = taskID;
                init();
            });
            $scope.$on('resources.data-update', init);
            $scope.$on('projects.data-update', init);
            _changeState('Loading resources', GanttResourcesService.initialized.then(function () {
                ctrl.loaded = true;
            }));
        }
        function init() {
            if(ctrl.taskID){
                ctrl.availableResources = GanttResourcesService.getAvailableForTaskResources(ctrl.taskID);
                ctrl.assignedResources = GanttResourcesService.getTaskResources(ctrl.taskID);
            }
        }

        function assignResourceToTask() {
            if(!/^[1-8](\.[0-9])*$/.test(ctrl.hoursEmployed) ||
                parseFloat(ctrl.hoursEmployed) <= 0 ||
                parseFloat(ctrl.hoursEmployed) > 8){
                ctrl.invalidHours = true;
            }else{
                ctrl.invalidHours = false;
                _changeState(
                    'Assigning resource',
                    GanttResourcesService.assignResourceToTask(ctrl.selectedResource.id, ctrl.taskID, ctrl.hoursEmployed)
                );
                ctrl.selectedResource = null;
            }

        }

        function unassignResourceFromTask(resourceID) {
            _changeState(
                'Unassigning resource',
                GanttResourcesService.unassignResourceFromTask(resourceID, ctrl.taskID)
            );
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