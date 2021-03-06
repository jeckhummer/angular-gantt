(function(){
    angular.module('gantt').controller('GanttTaskController', GanttTaskController);

    function GanttTaskController($scope, DateService, TimelineService, GanttBaselinesService, GanttTasksService,
                                 GanttOptionsService, GanttTasksHierarchyService, GanttResourcesActivityService){
        var ctrl = this;
        ctrl.moveTaskUp = moveTaskUp;
        ctrl.moveTaskDown = moveTaskDown;
        ctrl.indent = GanttOptionsService.indentOptions;
        ctrl.isMasterMode = GanttOptionsService.isMasterMode;
        ctrl.conflict = false;

        $scope.$watchCollection('task', init);

        $scope.$on('boundaries-changed', function(){ initPosition(ctrl) });
        $scope.$on('boundaries-changed', function(){ initBaseline(ctrl) });
        $scope.$on('baselines-changed', function(){ initBaseline(ctrl) });
        $scope.$on('current-baseline-changed', function(){ initBaseline(ctrl) });
        $scope.$on('resources.data-update', initResourcesConflict);
        $scope.$on('tasks-changed', initResourcesConflict);

        function init(task){
            if(task){
                ctrl.id = task.id;
                ctrl.name = task.name;
                ctrl.isMilestone = task.isMilestone;

                ctrl.start = task.start;
                ctrl.end = task.end;
                ctrl.dateInterval = task.dateInterval;

                ctrl.parentID = task.parentID;
                ctrl.isParent = GanttTasksHierarchyService.isParent(task.id);
                ctrl.order = GanttTasksHierarchyService.get(task.id).getOrder();
                ctrl.nestingDepth = GanttTasksHierarchyService.get(task.id).level - 1;
                ctrl.isFirstTaskWithinSiblings = GanttTasksHierarchyService.isFirstChild(task.id);
                ctrl.isLastTaskWithinSiblings = GanttTasksHierarchyService.isLastChild(task.id);

                ctrl.isCompleted = task.isCompleted;
                ctrl.percentComplete = task.percentComplete;

                if(ctrl.isCompleted){
                    ctrl.labelColorClass = 'label-success';
                }else{
                    if(ctrl.isMilestone){
                        ctrl.labelColorClass = 'label-danger';
                    }else{
                        if(ctrl.percentComplete >= 66 && ctrl.percentComplete < 100){
                            ctrl.labelColorClass = 'label-info';
                        } else if(ctrl.percentComplete >= 33 && ctrl.percentComplete < 66){
                            ctrl.labelColorClass = 'label-warning';
                        } else if(ctrl.percentComplete < 33){
                            ctrl.labelColorClass = 'label-danger';
                        }
                    }
                }

                initPosition(ctrl);
                initBaseline(ctrl);
                initResourcesConflict();
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

        function initResourcesConflict(){
            var conflicts = GanttResourcesActivityService.getConflicts(ctrl.id);
            if(conflicts && conflicts.length > 0) {
                ctrl.hasConflict = true;
                ctrl.conflicts = conflicts.map(function (c) {
                    return c.conflicts.map(function (x) {
                        // return {
                        //     name: x.resourceName,
                        //     hours: x.hours,
                        //     interval: c.interval
                        // }
                        return x.resourceName;
                    });
                })
                .reduce(function (acc, x) {
                    return acc.concat(x);
                }, [])
                .map(function (x) {
                    return '<span style="white-space: nowrap;">' + x + '</span>';
                })
                .unique()
                .join('<br />');
                // ctrl.conflict = true;
            }else{
                ctrl.hasConflict = false;
            }

            // console.log(ctrl.id, conflicts);
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
