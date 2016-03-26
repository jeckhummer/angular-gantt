(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($rootScope, $scope, DateService, TimelineService, GanttBaselinesService){
        var ctrl = this;
        ctrl.editTask = editTask;

        init($scope.$parent.task);

        $scope.$watchCollection('$parent.task', init);

        $scope.$on('boundaries-changed', () => initPosition(ctrl));
        $scope.$on('boundaries-changed', () => initBaseline(ctrl));
        $scope.$on('baselines-changed', () => initBaseline(ctrl));
        $scope.$on('current-baseline-changed', () => initBaseline(ctrl));

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
                task.baseline = {};
                task.baseline.position = baselineTask.position;
                task.baseline.dateInterval = baselineTask.dateInterval;
                task.hasBaseline = true;
            }else{
                task.hasBaseline = false;
            }
        }

        function initPosition(task){
            if(task.dateInterval){
                var boundaries = TimelineService.getBoundaries();
                task.position =
                    DateService.createDateIntervalPosition(boundaries, task.dateInterval);
                task.closerToEnd =
                    (100 - task.position.left - task.position.width) < +task.position.left;
            }
        }
    }
})();
