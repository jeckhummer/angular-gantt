(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($rootScope, $scope, DateService, GanttTasksService, GanttBaselinesService){
        var ctrl = this;
        ctrl.editTask = editTask;
        $scope.$watchCollection('$parent.task', init);
        $scope.$on('boundaries-changed', (boundaries) => initPosition(boundaries, ctrl));
        $scope.$on('current-baseline-changed', () => initBaseline(ctrl));

        init($scope.$parent.task);

        function editTask(task){
            $rootScope.$broadcast('dialog-toggle', 'add-task', task);
        }

        function init(task){
            if(task){
                ctrl.id = task.id;
                ctrl.name = task.name;
                ctrl.start = task.start;
                ctrl.end = task.end;
                ctrl.isParent = task.parentID == 0;
                ctrl.isMilestone = task.dateInterval.days == 1;
                ctrl.isCompleted = task.percentComplete == 100;
                ctrl.percentComplete = task.percentComplete;
                ctrl.dateInterval = task.dateInterval;
                initPosition(ctrl);
                initBaseline(ctrl);
            }
        }

        function initBaseline(task){
            var baselineTask = GanttBaselinesService.getTask(task.id);
            if(baselineTask){
                initPosition(baselineTask);
                task.baselinePosition = baselineTask.position;
                task.hasBaseline = true;
            }
        }

        function initPosition(task){
            if(task.dateInterval){
                var boundaries = GanttTasksService.getBoundaries();
                task.position =
                    DateService.createDateIntervalPosition(boundaries, task.dateInterval);
                task.closerToEnd =
                    (100 - task.position.left - task.position.width) < +task.position.left;
            }
        }
    }
})();
