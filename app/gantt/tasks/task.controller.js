(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($rootScope, $scope, DateService, GanttTasksService){
        var ctrl = this;
        ctrl.editTask = editTask;
        $scope.$watchCollection('$parent.task', init);
        $scope.$on('boundaries-changed', initPosition);

        init($scope.$parent.task);

        function editTask(task){
            $rootScope.$broadcast('dialog-toggle', 'add-task', task);
        }

        function init(task){
            if(task){
                ctrl.name = task.name;
                ctrl.start = task.start;
                ctrl.end = task.end;
                ctrl.isParent = task.parentID == 0;
                ctrl.isMilestone = task.dateInterval.days == 1;
                ctrl.isCompleted = task.percentComplete == 100;
                ctrl.percentComplete = task.percentComplete;
                ctrl.dateInterval = task.dateInterval;
                initPosition();
            }
        }

        function initPosition(){
            if(ctrl.dateInterval){
                var boundaries = GanttTasksService.getBoundaries();
                ctrl.position =
                    DateService.createDateIntervalPosition(boundaries, ctrl.dateInterval);
                ctrl.closerToEnd =
                    (100 - ctrl.position.left - ctrl.position.width) < +ctrl.position.left;
            }
        }
    }
})();
