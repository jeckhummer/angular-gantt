(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($rootScope, $scope, DateService, TimelineService, GanttBaselinesService,
                            GanttTasksService, GanttOptionsService, GanttTasksHierarchyService){
        var ctrl = this;
        ctrl.editTask = editTask;
        ctrl.moveTaskUp = moveTaskUp;
        ctrl.moveTaskDown = moveTaskDown;
        ctrl.indent = GanttOptionsService.indentOptions;

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
                ctrl.order = GanttTasksHierarchyService.get(task.id).getOrder();
                ctrl.name = task.name;
                ctrl.start = task.start;
                ctrl.end = task.end;
                ctrl.nestingDepth = GanttTasksHierarchyService.get(task.id).level - 1;
                ctrl.isMilestone = task.isMilestone;
                ctrl.isFirstTaskWithinSiblings = GanttTasksHierarchyService.isFirstChild(task.id);
                ctrl.isLastTaskWithinSiblings = GanttTasksHierarchyService.isLastChild(task.id);
                ctrl.isParent = GanttTasksHierarchyService.isParent(task.id);
                ctrl.isCompleted = task.isCompleted;
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

        function moveTaskUp(id, event){
            GanttTasksService.moveTaskUp(id);
            event.stopPropagation();
        }

        function moveTaskDown(id, event){
            GanttTasksService.moveTaskDown(id);
            event.stopPropagation();
        }
    }
})();
