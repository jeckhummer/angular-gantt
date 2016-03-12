(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($rootScope, $scope, DateService, GanttTasksService){
        var taskCtrl = this;
        taskCtrl.editTask = editTask;
        $scope.$watch('$parent.task', init);

        function editTask(task){
            $rootScope.$broadcast('dialog-toggle', 'add-task', task);
        }

        function init(task){
            if(task){
                taskCtrl.name = task.name;
                taskCtrl.start = task.start;
                taskCtrl.end = task.end;
                taskCtrl.isParent = task.parentID == 0;
                taskCtrl.isMilestone = task.dateInterval.days == 1;
                taskCtrl.isCompleted = task.percentComplete == 100;
                taskCtrl.percentComplete = task.percentComplete;
                taskCtrl.dateInterval = task.dateInterval;
                initPosition();
            }
        }

        function initPosition(){
            taskCtrl.position =
                DateService.createDateIntervalPosition(GanttTasksService.getBoundaries(), taskCtrl.dateInterval);
            taskCtrl.closerToEnd =
                (100 - taskCtrl.position.left - taskCtrl.position.width) < +taskCtrl.position.left;
        }
    }
})();
