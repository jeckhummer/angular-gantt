(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($rootScope, $scope, DateService){
        var taskCtrl = this;

        taskCtrl.start = $scope.task.start;
        taskCtrl.end = $scope.task.end;
        taskCtrl.isParent = $scope.task.parentID == 0;
        taskCtrl.isMilestone = $scope.task.dateInterval.days == 1;
        taskCtrl.isCompleted = $scope.task.percentComplete == 100;
        taskCtrl.percentComplete = $scope.task.percentComplete;
        taskCtrl.name = $scope.task.name;
        taskCtrl.position =
            DateService.createDateIntervalPosition($scope.ganttCtrl.boundaries, $scope.task.dateInterval);
        taskCtrl.closerToEnd =
            (100 - taskCtrl.position.left - taskCtrl.position.width) < +taskCtrl.position.left;

        taskCtrl.editTask = editTask;

        function editTask(task){
            $rootScope.$broadcast('dialog-toggle', 'add-task', task);
        }
    }
})();
